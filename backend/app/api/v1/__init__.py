"""
V1 API routes.
"""

from .breach import router as breach_router
from .url_scan import router as url_router
from .email_analyze import router as email_router
from .domain_check import router as domain_router
from .password import router as password_router

__all__ = [
    "breach_router",
    "url_router",
    "email_router",
    "domain_router",
    "password_router",
]