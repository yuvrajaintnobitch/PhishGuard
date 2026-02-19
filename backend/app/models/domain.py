"""
Pydantic models for Domain Health Checker.
"""

from pydantic import BaseModel
from typing import List, Literal, Optional


RiskLevel = Literal["safe", "low", "medium", "high", "critical"]


class DomainCheckRequest(BaseModel):
    """Request to check domain health."""
    domain: str


class DNSRecord(BaseModel):
    """DNS record check result."""
    exists: bool
    valid: bool
    record: Optional[str] = None
    issues: List[str] = []


class DomainCheckResponse(BaseModel):
    """Response from domain check."""
    domain: str
    score: int  # 0-100
    riskLevel: RiskLevel
    spf: DNSRecord
    dkim: DNSRecord
    dmarc: DNSRecord
    summary: str