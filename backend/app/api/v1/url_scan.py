"""
URL Scanner API routes.
"""

from fastapi import APIRouter, HTTPException
from app.models.url_scan import URLScanRequest, URLScanResponse
from app.services import scan_url

router = APIRouter(prefix="/url", tags=["URL Scanner"])


@router.post("/scan", response_model=URLScanResponse)
async def scan_url_endpoint(request: URLScanRequest):
    """
    Scan a URL for potential threats.
    
    Uses VirusTotal and Google Safe Browsing APIs.
    """
    try:
        result = await scan_url(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))