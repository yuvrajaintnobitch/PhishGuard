"""
PhishGuard API — Main Application Entry Point.

A cybersecurity API for phishing detection and email security analysis.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import init_db
from app.api.router import api_router
from app.middleware.cors import setup_cors


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    Runs on startup and shutdown.
    """
    # Startup
    print(f"🚀 Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    await init_db()
    print("✅ Database initialized")
    
    yield
    
    # Shutdown
    print("👋 Shutting down...")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered phishing detection and cybersecurity analysis API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Setup middleware
setup_cors(app)

# Include API routes
app.include_router(api_router)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API info."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/api/v1/health",
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Handle all unhandled exceptions."""
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred. Please try again later.",
            "error": str(exc) if settings.DEBUG else None,
        },
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )