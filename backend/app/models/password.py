"""
Pydantic models for Password Pwned Checker.
"""

from pydantic import BaseModel, Field


class PasswordCheckRequest(BaseModel):
    """Request to check if password has been pwned."""
    password: str = Field(..., min_length=1, max_length=256)


class PasswordCheckResponse(BaseModel):
    """Response from password pwned check."""
    isPwned: bool
    occurrenceCount: int
    riskLevel: str  # "safe", "low", "medium", "high", "critical"
    message: str