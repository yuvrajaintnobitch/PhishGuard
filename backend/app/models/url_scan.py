"""
Pydantic models for URL Scanner.
"""

from pydantic import BaseModel, HttpUrl
from typing import List, Literal, Optional


RiskLevel = Literal["safe", "low", "medium", "high", "critical"]


class URLScanRequest(BaseModel):
    """Request to scan a URL."""
    url: str


class URLThreat(BaseModel):
    """Detected threat information."""
    type: str
    description: str
    severity: RiskLevel


class ScannerResult(BaseModel):
    """Result from a single scanner."""
    name: str
    result: Literal["clean", "malicious", "suspicious", "unknown"]


class URLScanResponse(BaseModel):
    """Response from URL scan."""
    url: str
    safe: bool
    score: int  # 0-100
    riskLevel: RiskLevel
    threats: List[URLThreat]
    scanners: List[ScannerResult]