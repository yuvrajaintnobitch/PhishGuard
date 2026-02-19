"""
Password Pwned Checker API routes.
"""

from fastapi import APIRouter, HTTPException
from app.models.password import PasswordCheckRequest, PasswordCheckResponse
from app.services.password_service import check_password_pwned

router = APIRouter(prefix="/password", tags=["Password Checker"])


@router.post("/check", response_model=PasswordCheckResponse)
async def check_password_endpoint(request: PasswordCheckRequest):
    """
    Check if a password has been exposed in data breaches.
    
    Uses HIBP Pwned Passwords API v3 (free, no API key required).
    Uses k-anonymity — your password never leaves the server.
    """
    try:
        is_pwned, count = await check_password_pwned(request.password)
        
        # Determine risk level based on occurrence count
        if not is_pwned:
            risk_level = "safe"
            message = "This password has not been found in any known data breaches."
        elif count < 10:
            risk_level = "low"
            message = f"This password has been seen {count} time(s) in data breaches. Consider changing it."
        elif count < 100:
            risk_level = "medium"
            message = f"This password has been seen {count} times in data breaches. You should change it."
        elif count < 1000:
            risk_level = "high"
            message = f"This password has been seen {count} times in data breaches. Change it immediately!"
        else:
            risk_level = "critical"
            message = f"This password has been seen {count:,} times in data breaches. It's extremely unsafe!"
        
        return PasswordCheckResponse(
            isPwned=is_pwned,
            occurrenceCount=count,
            riskLevel=risk_level,
            message=message
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))