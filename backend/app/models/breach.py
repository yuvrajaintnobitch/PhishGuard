"""
Pydantic models for Email Breach Checker.
"""

from pydantic import BaseModel, EmailStr
from typing import List


class BreachCheckRequest(BaseModel):
    """Request to check email for breaches."""
    email: EmailStr


class BreachInfo(BaseModel):
    """Information about a single breach."""
    name: str
    domain: str
    breachDate: str
    dataClasses: List[str]
    description: str


class BreachCheckResponse(BaseModel):
    """Response from breach check."""
    email: str
    breached: bool
    breachCount: int
    breaches: List[BreachInfo]
    isDemo: bool = True