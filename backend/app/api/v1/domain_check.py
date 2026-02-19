"""
Domain Health Checker API routes.
"""

from fastapi import APIRouter, HTTPException
from app.models.domain import DomainCheckRequest, DomainCheckResponse
from app.services import check_domain

router = APIRouter(prefix="/domain", tags=["Domain Checker"])


@router.post("/check", response_model=DomainCheckResponse)
async def check_domain_endpoint(request: DomainCheckRequest):
    """
    Check domain email authentication (SPF, DKIM, DMARC).
    """
    try:
        result = await check_domain(request.domain)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))