"""
Email Content Analyzer API routes.
"""

from fastapi import APIRouter, HTTPException
from app.models.email import EmailAnalyzeRequest, EmailAnalyzeResponse
from app.services import analyze_email

router = APIRouter(prefix="/email", tags=["Email Analyzer"])


@router.post("/analyze", response_model=EmailAnalyzeResponse)
async def analyze_email_endpoint(request: EmailAnalyzeRequest):
    """
    Analyze email content for phishing indicators.
    
    Uses pattern matching and AI explanation.
    """
    try:
        result = await analyze_email(request.content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))