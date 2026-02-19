"""
URL scanning service.
Uses VirusTotal and Google Safe Browsing APIs.
"""

import httpx
import hashlib
import base64
from typing import List, Tuple
from urllib.parse import urlparse
from app.config import settings
from app.models.url_scan import (
    URLScanResponse,
    URLThreat,
    ScannerResult,
)


# Known malicious patterns for basic detection
SUSPICIOUS_PATTERNS = [
    "login", "signin", "verify", "secure", "account", "update",
    "confirm", "banking", "paypal", "netflix", "microsoft", "apple",
    "amazon", "google", "facebook", "password", "credential"
]

SUSPICIOUS_TLDS = [
    ".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".club", ".online"
]


def analyze_url_locally(url: str) -> Tuple[List[URLThreat], int]:
    """
    Local URL analysis without external APIs.
    Returns threats and a risk score.
    """
    threats = []
    score = 0
    
    try:
        parsed = urlparse(url)
        domain = parsed.netloc.lower()
        path = parsed.path.lower()
        full_url = url.lower()
        
        # Check for IP address instead of domain
        if any(c.isdigit() for c in domain.split(".")[0]):
            import re
            if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", domain):
                threats.append(URLThreat(
                    type="IP Address URL",
                    description="URL uses IP address instead of domain name — common phishing tactic.",
                    severity="high"
                ))
                score += 30
        
        # Check suspicious TLDs
        for tld in SUSPICIOUS_TLDS:
            if domain.endswith(tld):
                threats.append(URLThreat(
                    type="Suspicious TLD",
                    description=f"Domain uses {tld} TLD often associated with malicious sites.",
                    severity="medium"
                ))
                score += 15
                break
        
        # Check for suspicious patterns
        patterns_found = []
        for pattern in SUSPICIOUS_PATTERNS:
            if pattern in full_url:
                patterns_found.append(pattern)
        
        if len(patterns_found) >= 3:
            threats.append(URLThreat(
                type="Suspicious Keywords",
                description=f"URL contains multiple suspicious keywords: {', '.join(patterns_found[:3])}",
                severity="high"
            ))
            score += 25
        elif len(patterns_found) >= 1:
            threats.append(URLThreat(
                type="Suspicious Keywords", 
                description=f"URL contains suspicious keywords: {', '.join(patterns_found)}",
                severity="low"
            ))
            score += 10
        
        # Check for excessive subdomains
        subdomain_count = len(domain.split(".")) - 2
        if subdomain_count >= 3:
            threats.append(URLThreat(
                type="Excessive Subdomains",
                description="URL has many subdomains — often used to impersonate legitimate sites.",
                severity="medium"
            ))
            score += 15
        
        # Check for URL shorteners
        shorteners = ["bit.ly", "tinyurl", "t.co", "goo.gl", "ow.ly", "is.gd"]
        if any(s in domain for s in shorteners):
            threats.append(URLThreat(
                type="URL Shortener",
                description="URL uses a shortening service that hides the actual destination.",
                severity="low"
            ))
            score += 10
        
        # Check for HTTPS
        if parsed.scheme != "https":
            threats.append(URLThreat(
                type="No HTTPS",
                description="URL does not use HTTPS encryption.",
                severity="low"
            ))
            score += 5
        
        # Check for suspicious characters
        if "@" in url:
            threats.append(URLThreat(
                type="Deceptive URL Format",
                description="URL contains @ symbol which can be used to hide the real destination.",
                severity="high"
            ))
            score += 25
            
    except Exception as e:
        pass
    
    return threats, min(score, 100)


async def scan_with_virustotal(url: str) -> List[ScannerResult]:
    """
    Scan URL using VirusTotal API.
    Free tier: 500 requests/day.
    """
    if not settings.VIRUSTOTAL_API_KEY:
        return []
    
    # URL must be base64 encoded
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    
    headers = {"x-apikey": settings.VIRUSTOTAL_API_KEY}
    
    async with httpx.AsyncClient() as client:
        try:
            # First, submit URL for scanning
            submit_response = await client.post(
                "https://www.virustotal.com/api/v3/urls",
                headers=headers,
                data={"url": url},
                timeout=15.0
            )
            
            if submit_response.status_code != 200:
                return []
            
            # Then get the analysis results
            analysis_url = f"https://www.virustotal.com/api/v3/urls/{url_id}"
            result_response = await client.get(
                analysis_url,
                headers=headers,
                timeout=15.0
            )
            
            if result_response.status_code == 200:
                data = result_response.json()
                results = data.get("data", {}).get("attributes", {}).get("last_analysis_results", {})
                
                scanner_results = []
                for scanner_name, scanner_data in list(results.items())[:10]:  # Limit to 10
                    category = scanner_data.get("category", "unknown")
                    if category == "harmless" or category == "undetected":
                        result = "clean"
                    elif category == "malicious":
                        result = "malicious"
                    elif category == "suspicious":
                        result = "suspicious"
                    else:
                        result = "unknown"
                    
                    scanner_results.append(ScannerResult(
                        name=scanner_name,
                        result=result
                    ))
                
                return scanner_results
                
        except Exception as e:
            print(f"VirusTotal error: {e}")
    
    return []


async def scan_with_safe_browsing(url: str) -> bool:
    """
    Check URL using Google Safe Browsing API.
    Free tier: 10,000 requests/day.
    Returns True if URL is safe, False if threats found.
    """
    if not settings.GOOGLE_SAFE_BROWSING_API_KEY:
        return True  # Assume safe if no API key
    
    endpoint = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={settings.GOOGLE_SAFE_BROWSING_API_KEY}"
    
    payload = {
        "client": {
            "clientId": "phishguard",
            "clientVersion": "1.0.0"
        },
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(endpoint, json=payload, timeout=10.0)
            if response.status_code == 200:
                data = response.json()
                # If matches found, URL is unsafe
                return "matches" not in data
        except Exception as e:
            print(f"Safe Browsing error: {e}")
    
    return True  # Assume safe on error


def calculate_risk_level(score: int) -> str:
    """Convert numeric score to risk level."""
    if score <= 20:
        return "safe"
    elif score <= 40:
        return "low"
    elif score <= 60:
        return "medium"
    elif score <= 80:
        return "high"
    else:
        return "critical"


async def scan_url(url: str) -> URLScanResponse:
    """
    Comprehensive URL scanning.
    Combines local analysis + external APIs.
    """
    # Ensure URL has scheme
    if not url.startswith(("http://", "https://")):
        url = f"https://{url}"
    
    # Local analysis
    threats, local_score = analyze_url_locally(url)
    
    # External API checks
    scanner_results = []
    
    # VirusTotal scan
    vt_results = await scan_with_virustotal(url)
    scanner_results.extend(vt_results)
    
    # Google Safe Browsing check
    is_safe_gsb = await scan_with_safe_browsing(url)
    scanner_results.append(ScannerResult(
        name="Google Safe Browsing",
        result="clean" if is_safe_gsb else "malicious"
    ))
    
    if not is_safe_gsb:
        threats.append(URLThreat(
            type="Google Safe Browsing Alert",
            description="URL flagged by Google Safe Browsing as potentially dangerous.",
            severity="critical"
        ))
        local_score = min(local_score + 40, 100)
    
    # Add malicious count from scanners to score
    malicious_count = sum(1 for s in scanner_results if s.result == "malicious")
    if malicious_count > 0:
        local_score = min(local_score + (malicious_count * 15), 100)
    
    # If no scanner results, add placeholder
    if not scanner_results:
        scanner_results = [
            ScannerResult(name="Local Analysis", result="clean" if local_score < 50 else "suspicious"),
        ]
    
    risk_level = calculate_risk_level(local_score)
    is_safe = local_score <= 30 and malicious_count == 0
    
    return URLScanResponse(
        url=url,
        safe=is_safe,
        score=local_score,
        riskLevel=risk_level,
        threats=threats,
        scanners=scanner_results
    )