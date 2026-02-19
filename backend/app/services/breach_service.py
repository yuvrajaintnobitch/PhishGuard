"""
Breach checking service.
Uses demo data (free, no API key required).
"""

import hashlib
from typing import List
from app.models.breach import BreachInfo, BreachCheckResponse


# Sample breach database for demo purposes
SAMPLE_BREACHES = {
    "adobe": BreachInfo(
        name="Adobe",
        domain="adobe.com",
        breachDate="2013-10-04",
        dataClasses=["Email addresses", "Password hints", "Passwords", "Usernames"],
        description="In October 2013, Adobe suffered a massive breach exposing 153 million records including emails, passwords, and password hints."
    ),
    "linkedin": BreachInfo(
        name="LinkedIn",
        domain="linkedin.com",
        breachDate="2012-05-05",
        dataClasses=["Email addresses", "Passwords"],
        description="In 2012, LinkedIn had 164 million email addresses and passwords exposed. The data was later sold online in 2016."
    ),
    "dropbox": BreachInfo(
        name="Dropbox",
        domain="dropbox.com",
        breachDate="2012-07-01",
        dataClasses=["Email addresses", "Passwords"],
        description="In 2012, Dropbox suffered a data breach exposing 68 million user accounts with emails and bcrypt-hashed passwords."
    ),
    "myspace": BreachInfo(
        name="MySpace",
        domain="myspace.com",
        breachDate="2008-07-01",
        dataClasses=["Email addresses", "Passwords", "Usernames"],
        description="In 2008, MySpace suffered a breach that exposed 360 million accounts. The data surfaced in 2016."
    ),
    "twitter": BreachInfo(
        name="Twitter",
        domain="twitter.com",
        breachDate="2022-01-01",
        dataClasses=["Email addresses", "Phone numbers", "Usernames"],
        description="In 2022, a vulnerability allowed attackers to obtain email addresses and phone numbers of 200+ million Twitter users."
    ),
}


async def check_email_breach(email: str) -> BreachCheckResponse:
    """
    Demo breach check using simulated data.
    For real data, use HIBP API (requires paid key).
    """
    email_lower = email.lower().strip()
    email_hash = hashlib.sha256(email_lower.encode()).hexdigest()
    
    breaches: List[BreachInfo] = []
    
    # Simulate breach detection based on email patterns
    # This creates realistic-looking demo data
    
    # Check for common test patterns
    if "test" in email_lower or "demo" in email_lower:
        breaches.append(SAMPLE_BREACHES["adobe"])
        breaches.append(SAMPLE_BREACHES["linkedin"])
    
    # Hash-based pseudo-random assignment
    elif email_hash[0] in "0123":
        breaches.append(SAMPLE_BREACHES["adobe"])
    elif email_hash[0] in "4567":
        breaches.append(SAMPLE_BREACHES["dropbox"])
        breaches.append(SAMPLE_BREACHES["myspace"])
    elif email_hash[0] in "89ab":
        breaches.append(SAMPLE_BREACHES["linkedin"])
    elif email_hash[0] in "cd":
        breaches.append(SAMPLE_BREACHES["twitter"])
        breaches.append(SAMPLE_BREACHES["adobe"])
    # "ef" = no breaches (safe demo result)
    
    return BreachCheckResponse(
        email=email,
        breached=len(breaches) > 0,
        breachCount=len(breaches),
        breaches=breaches,
        isDemo=True  # Always demo mode
    )