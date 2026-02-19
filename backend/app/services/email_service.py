"""
Email content analysis service.
Uses pattern matching + AI for phishing detection.
"""

import re
from typing import List, Tuple
from app.config import settings
from app.models.email import EmailAnalyzeResponse, RedFlag


# Phishing indicators and patterns
URGENCY_WORDS = [
    "urgent", "immediately", "right away", "asap", "expires", "suspended",
    "verify now", "act now", "limited time", "within 24 hours", "action required"
]

THREAT_WORDS = [
    "suspended", "locked", "disabled", "compromised", "unauthorized",
    "violation", "terminated", "closed", "restricted"
]

REWARD_WORDS = [
    "winner", "congratulations", "prize", "reward", "free gift",
    "lottery", "million dollars", "inheritance", "selected"
]

SUSPICIOUS_PHRASES = [
    "click here", "click below", "verify your account", "confirm your identity",
    "update your information", "unusual activity", "security alert",
    "password reset", "account verification", "dear customer",
    "dear user", "dear valued", "we detected", "your account has been"
]

SPOOFED_BRANDS = [
    "paypal", "amazon", "netflix", "apple", "microsoft", "google",
    "facebook", "instagram", "whatsapp", "bank of america", "wells fargo",
    "chase", "citibank", "irs", "fedex", "ups", "dhl"
]


def analyze_email_locally(content: str) -> Tuple[List[RedFlag], int, int]:
    """
    Analyze email content for phishing indicators.
    Returns: (red_flags, score, confidence)
    """
    red_flags = []
    score = 0
    content_lower = content.lower()
    
    # Check for urgency words
    urgency_found = [w for w in URGENCY_WORDS if w in content_lower]
    if urgency_found:
        red_flags.append(RedFlag(
            type="Urgency Tactics",
            description=f"Email creates false urgency with words like: {', '.join(urgency_found[:3])}",
            severity="medium",
            location="Email body"
        ))
        score += 15
    
    # Check for threat words
    threats_found = [w for w in THREAT_WORDS if w in content_lower]
    if threats_found:
        red_flags.append(RedFlag(
            type="Fear Tactics",
            description=f"Email uses fear-inducing language: {', '.join(threats_found[:3])}",
            severity="high",
            location="Email body"
        ))
        score += 20
    
    # Check for reward/prize words
    rewards_found = [w for w in REWARD_WORDS if w in content_lower]
    if rewards_found:
        red_flags.append(RedFlag(
            type="Too Good To Be True",
            description=f"Email promises unrealistic rewards: {', '.join(rewards_found[:3])}",
            severity="high",
            location="Email body"
        ))
        score += 25
    
    # Check for suspicious phrases
    phrases_found = [p for p in SUSPICIOUS_PHRASES if p in content_lower]
    if len(phrases_found) >= 2:
        red_flags.append(RedFlag(
            type="Suspicious Phrasing",
            description="Email contains multiple common phishing phrases.",
            severity="medium",
            location="Email body"
        ))
        score += 15
    
    # Check for spoofed brand names
    brands_found = [b for b in SPOOFED_BRANDS if b in content_lower]
    if brands_found:
        red_flags.append(RedFlag(
            type="Brand Impersonation",
            description=f"Email mentions brands commonly spoofed: {', '.join(brands_found[:2])}",
            severity="medium",
            location="Email body"
        ))
        score += 10
    
    # Check for suspicious URLs
    url_pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
    urls = re.findall(url_pattern, content)
    
    suspicious_url_indicators = ["bit.ly", "tinyurl", "@", "login", "verify", "secure"]
    for url in urls:
        url_lower = url.lower()
        for indicator in suspicious_url_indicators:
            if indicator in url_lower:
                red_flags.append(RedFlag(
                    type="Suspicious Link",
                    description=f"Email contains a potentially dangerous link.",
                    severity="high",
                    location=url[:50] + "..." if len(url) > 50 else url
                ))
                score += 20
                break
    
    # Check for mismatched sender
    from_match = re.search(r'from:\s*([^\n]+)', content_lower)
    if from_match:
        from_header = from_match.group(1)
        # Check if From contains brand but domain doesn't match
        for brand in SPOOFED_BRANDS:
            if brand in from_header and brand not in from_header.split("@")[-1]:
                red_flags.append(RedFlag(
                    type="Sender Mismatch",
                    description=f"Sender claims to be {brand} but email domain doesn't match.",
                    severity="critical",
                    location="From header"
                ))
                score += 30
                break
    
    # Check for poor grammar indicators
    grammar_issues = [
        "kindly", "do the needful", "revert back", "same has been",
        "please to", "updation", "aborting"
    ]
    grammar_found = [g for g in grammar_issues if g in content_lower]
    if grammar_found:
        red_flags.append(RedFlag(
            type="Grammar Issues",
            description="Email contains unusual grammar often seen in phishing emails.",
            severity="low",
            location="Email body"
        ))
        score += 5
    
    # Check for generic greeting
    generic_greetings = ["dear customer", "dear user", "dear valued", "dear sir/madam", "dear account holder"]
    if any(g in content_lower for g in generic_greetings):
        red_flags.append(RedFlag(
            type="Generic Greeting",
            description="Email uses generic greeting instead of your name.",
            severity="low",
            location="Email greeting"
        ))
        score += 5
    
    # Calculate confidence based on number of flags
    if len(red_flags) >= 5:
        confidence = 95
    elif len(red_flags) >= 3:
        confidence = 80
    elif len(red_flags) >= 2:
        confidence = 65
    elif len(red_flags) >= 1:
        confidence = 50
    else:
        confidence = 30
    
    return red_flags, min(score, 100), confidence


async def get_ai_explanation(content: str, red_flags: List[RedFlag], is_phishing: bool) -> str:
    """
    Generate AI explanation using Groq API (free).
    Falls back to template if API unavailable.
    """
    if not settings.GROQ_API_KEY:
        # Fallback explanation
        if is_phishing:
            flags_summary = ", ".join([f.type for f in red_flags[:3]])
            return (
                f"This email shows multiple signs of a phishing attempt. "
                f"Key concerns include: {flags_summary}. "
                f"The sender appears to be trying to create urgency and trick you into clicking malicious links or sharing sensitive information. "
                f"Do not click any links or provide personal information."
            )
        else:
            return (
                "This email appears to be legitimate based on our analysis. "
                "However, always verify the sender's identity and be cautious with any links or attachments. "
                "If you're unsure, contact the sender through official channels."
            )
    
    # Use Groq API for AI explanation
    try:
        import httpx
        
        prompt = f"""Analyze this email for phishing indicators and provide a brief explanation (2-3 sentences).

Email content:
{content[:1500]}

Detected issues: {', '.join([f.type for f in red_flags]) if red_flags else 'None'}

Is this likely phishing: {'Yes' if is_phishing else 'No'}

Provide a clear, helpful explanation for a non-technical user:"""

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama3-8b-8192",
                    "messages": [
                        {"role": "system", "content": "You are a cybersecurity expert helping users identify phishing emails. Be concise and helpful."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 200
                },
                timeout=15.0
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"].strip()
                
    except Exception as e:
        print(f"Groq API error: {e}")
    
    # Fallback
    if is_phishing:
        return "This email shows characteristics commonly associated with phishing attempts. Exercise caution and avoid clicking any links."
    return "This email appears legitimate, but always verify the sender before taking action."


def calculate_risk_level(score: int) -> str:
    """Convert score to risk level."""
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


async def analyze_email(content: str) -> EmailAnalyzeResponse:
    """
    Full email analysis pipeline.
    """
    # Local analysis
    red_flags, score, confidence = analyze_email_locally(content)
    
    # Determine if phishing
    is_phishing = score >= 40 or len(red_flags) >= 3
    
    # Get AI explanation
    explanation = await get_ai_explanation(content, red_flags, is_phishing)
    
    risk_level = calculate_risk_level(score)
    
    return EmailAnalyzeResponse(
        isPhishing=is_phishing,
        confidence=confidence,
        score=score,
        riskLevel=risk_level,
        redFlags=red_flags,
        explanation=explanation
    )