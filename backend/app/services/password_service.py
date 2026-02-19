"""
Password Pwned Checker.
Uses HIBP Pwned Passwords API v3 (completely free, no API key required).
Uses k-anonymity to protect privacy — only sends first 5 chars of SHA1 hash.
"""

import hashlib
import httpx
from typing import Tuple


async def check_password_pwned(password: str) -> Tuple[bool, int]:
    """
    Check if password has been exposed in data breaches.
    
    Returns:
        (is_pwned: bool, occurrence_count: int)
    
    Uses k-anonymity:
    - Only sends first 5 chars of SHA1 hash to API
    - Searches remaining chars locally
    - Password never leaves your server
    """
    # Hash the password using SHA-1
    sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    
    # Split into prefix (first 5 chars) and suffix (rest)
    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]
    
    # Query HIBP API with only the prefix
    url = f"https://api.pwnedpasswords.com/range/{prefix}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=10.0)
            
            if response.status_code != 200:
                # API error — assume safe
                return False, 0
            
            # Parse response (format: "SUFFIX:COUNT\n")
            hash_lines = response.text.splitlines()
            
            for line in hash_lines:
                hash_suffix, count = line.split(':')
                
                # Check if our password's suffix matches
                if hash_suffix == suffix:
                    return True, int(count)
            
            # Password not found in breaches
            return False, 0
            
        except Exception as e:
            print(f"Password check error: {e}")
            # On error, assume safe (don't block user)
            return False, 0