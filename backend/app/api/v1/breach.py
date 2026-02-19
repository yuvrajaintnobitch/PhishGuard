"""
Email Breach Checker API routes.
"""

from fastapi import APIRouter, HTTPException
from app.models.breach import BreachCheckRequest, BreachCheckResponse
from app.services import check_email_breach

router = APIRouter(prefix="/breach", tags=["Breach Checker"])


@router.post("/check", response_model=BreachCheckResponse)
async def check_breach(request: BreachCheckRequest):
    """
    Check if an email has been involved in known data breaches.
    
    Uses k-anonymity to protect privacy.
    """
    try:
        result = await check_email_breach(request.email)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))