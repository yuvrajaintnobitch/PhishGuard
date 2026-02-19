"""
Domain health checking service.
Verifies SPF, DKIM, and DMARC records.
"""

import dns.resolver
import dns.exception
from typing import List, Optional, Tuple
from app.models.domain import DomainCheckResponse, DNSRecord


def check_spf(domain: str) -> DNSRecord:
    """
    Check SPF record for domain.
    """
    issues = []
    record_text = None
    exists = False
    valid = False
    
    try:
        # SPF records are TXT records
        answers = dns.resolver.resolve(domain, "TXT")
        
        for rdata in answers:
            txt = rdata.to_text().strip('"')
            if txt.startswith("v=spf1"):
                exists = True
                record_text = txt
                
                # Validate SPF record
                if "all" in txt:
                    valid = True
                    
                    if "+all" in txt:
                        issues.append("SPF uses +all which allows any server to send email")
                    elif "?all" in txt:
                        issues.append("SPF uses ?all (neutral) which provides weak protection")
                else:
                    issues.append("SPF record missing 'all' mechanism")
                
                # Check for too many lookups
                lookup_mechanisms = ["include:", "a:", "mx:", "ptr:", "exists:"]
                lookup_count = sum(txt.count(m) for m in lookup_mechanisms)
                if lookup_count > 10:
                    issues.append(f"SPF has {lookup_count} lookups (max recommended: 10)")
                
                break
                
    except dns.resolver.NXDOMAIN:
        issues.append("Domain does not exist")
    except dns.resolver.NoAnswer:
        issues.append("No SPF record found")
    except dns.exception.DNSException as e:
        issues.append(f"DNS lookup failed: {str(e)}")
    
    if not exists:
        issues.append("No SPF record configured — domain can be easily spoofed")
    
    return DNSRecord(
        exists=exists,
        valid=valid,
        record=record_text,
        issues=issues
    )


def check_dkim(domain: str) -> DNSRecord:
    """
    Check DKIM record for domain.
    Note: DKIM selector is usually unknown, so we check common selectors.
    """
    issues = []
    record_text = None
    exists = False
    valid = False
    
    # Common DKIM selectors
    selectors = ["default", "google", "selector1", "selector2", "k1", "mail", "dkim"]
    
    for selector in selectors:
        try:
            dkim_domain = f"{selector}._domainkey.{domain}"
            answers = dns.resolver.resolve(dkim_domain, "TXT")
            
            for rdata in answers:
                txt = rdata.to_text().strip('"')
                if "v=DKIM1" in txt or "k=rsa" in txt:
                    exists = True
                    valid = True
                    record_text = f"Selector: {selector} | {txt[:100]}..."
                    break
            
            if exists:
                break
                
        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
            continue
        except dns.exception.DNSException:
            continue
    
    if not exists:
        issues.append("No DKIM record found with common selectors")
        issues.append("Email authenticity cannot be verified")
    
    return DNSRecord(
        exists=exists,
        valid=valid,
        record=record_text,
        issues=issues
    )


def check_dmarc(domain: str) -> DNSRecord:
    """
    Check DMARC record for domain.
    """
    issues = []
    record_text = None
    exists = False
    valid = False
    
    try:
        dmarc_domain = f"_dmarc.{domain}"
        answers = dns.resolver.resolve(dmarc_domain, "TXT")
        
        for rdata in answers:
            txt = rdata.to_text().strip('"')
            if txt.startswith("v=DMARC1"):
                exists = True
                record_text = txt
                
                # Check policy
                if "p=reject" in txt:
                    valid = True
                elif "p=quarantine" in txt:
                    valid = True
                    issues.append("DMARC policy is 'quarantine' — consider upgrading to 'reject'")
                elif "p=none" in txt:
                    issues.append("DMARC policy is 'none' — provides monitoring only, no protection")
                else:
                    issues.append("DMARC policy not specified")
                
                # Check for reporting
                if "rua=" not in txt and "ruf=" not in txt:
                    issues.append("No DMARC reporting configured")
                
                # Check percentage
                if "pct=" in txt:
                    import re
                    pct_match = re.search(r"pct=(\d+)", txt)
                    if pct_match:
                        pct = int(pct_match.group(1))
                        if pct < 100:
                            issues.append(f"DMARC only applies to {pct}% of emails")
                
                break
                
    except dns.resolver.NXDOMAIN:
        issues.append("Domain does not exist")
    except dns.resolver.NoAnswer:
        issues.append("No DMARC record found")
    except dns.exception.DNSException as e:
        issues.append(f"DNS lookup failed: {str(e)}")
    
    if not exists:
        issues.append("No DMARC policy — attackers can easily spoof this domain")
    
    return DNSRecord(
        exists=exists,
        valid=valid,
        record=record_text,
        issues=issues
    )


def calculate_domain_score(spf: DNSRecord, dkim: DNSRecord, dmarc: DNSRecord) -> Tuple[int, str]:
    """
    Calculate overall domain security score.
    Returns (score, risk_level).
    """
    score = 0
    
    # SPF scoring (0-35 points for issues)
    if not spf.exists:
        score += 35
    elif not spf.valid:
        score += 20
    elif spf.issues:
        score += 10
    
    # DKIM scoring (0-30 points for issues)
    if not dkim.exists:
        score += 30
    elif not dkim.valid:
        score += 15
    
    # DMARC scoring (0-35 points for issues)
    if not dmarc.exists:
        score += 35
    elif not dmarc.valid:
        score += 20
    elif dmarc.issues:
        score += 10
    
    # Determine risk level
    if score <= 20:
        risk_level = "safe"
    elif score <= 40:
        risk_level = "low"
    elif score <= 60:
        risk_level = "medium"
    elif score <= 80:
        risk_level = "high"
    else:
        risk_level = "critical"
    
    return score, risk_level


def generate_summary(spf: DNSRecord, dkim: DNSRecord, dmarc: DNSRecord, score: int) -> str:
    """Generate human-readable summary."""
    
    if score <= 20:
        return "This domain has excellent email security configuration. All major protections are in place."
    elif score <= 40:
        return "This domain has good email security with minor issues. Emails from this domain can be reasonably trusted."
    elif score <= 60:
        return "This domain has some security gaps. Exercise caution with emails claiming to be from this sender."
    elif score <= 80:
        return "This domain has significant security issues. It may be vulnerable to spoofing attacks."
    else:
        return "This domain lacks basic email security. Emails can be easily forged to appear from this domain."


async def check_domain(domain: str) -> DomainCheckResponse:
    """
    Comprehensive domain security check.
    """
    # Clean domain input
    domain = domain.lower().strip()
    if domain.startswith("http://") or domain.startswith("https://"):
        from urllib.parse import urlparse
        domain = urlparse(domain).netloc
    if domain.startswith("www."):
        domain = domain[4:]
    
    # Check all records
    spf = check_spf(domain)
    dkim = check_dkim(domain)
    dmarc = check_dmarc(domain)
    
    # Calculate score
    score, risk_level = calculate_domain_score(spf, dkim, dmarc)
    
    # Generate summary
    summary = generate_summary(spf, dkim, dmarc, score)
    
    return DomainCheckResponse(
        domain=domain,
        score=score,
        riskLevel=risk_level,
        spf=spf,
        dkim=dkim,
        dmarc=dmarc,
        summary=summary
    )