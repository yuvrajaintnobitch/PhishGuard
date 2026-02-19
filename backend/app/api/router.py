"""
Main API router.
Combines all route modules.
"""

from fastapi import APIRouter
from app.api.v1 import breach_router, url_router, email_router, domain_router, password_router

# Main API router
api_router = APIRouter(prefix="/api/v1")

# Include all routers
api_router.include_router(breach_router)
api_router.include_router(url_router)
api_router.include_router(email_router)
api_router.include_router(domain_router)
api_router.include_router(password_router)


# Health check
@api_router.get("/health", tags=["Health"])
async def health_check():
    """API health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}