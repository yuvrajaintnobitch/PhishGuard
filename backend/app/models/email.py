"""
Pydantic models for Email Content Analyzer.
"""

from pydantic import BaseModel
from typing import List, Literal, Optional


RiskLevel = Literal["safe", "low", "medium", "high", "critical"]


class EmailAnalyzeRequest(BaseModel):
    """Request to analyze email content."""
    content: str


class RedFlag(BaseModel):
    """Detected red flag in email."""
    type: str
    description: str
    severity: RiskLevel
    location: Optional[str] = None


class EmailAnalyzeResponse(BaseModel):
    """Response from email analysis."""
    isPhishing: bool
    confidence: int  # 0-100
    score: int  # 0-100
    riskLevel: RiskLevel
    redFlags: List[RedFlag]
    explanation: str