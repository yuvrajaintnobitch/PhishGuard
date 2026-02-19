"""
Application configuration using Pydantic Settings.
Loads environment variables from .env file.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # App
    APP_NAME: str = "PhishGuard API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./phishguard.db"
    
    # External APIs (Free tiers)
    VIRUSTOTAL_API_KEY: str = ""
    GOOGLE_SAFE_BROWSING_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()


settings = get_settings()