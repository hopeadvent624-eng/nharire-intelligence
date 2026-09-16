from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.core.config import settings
from app.core.logging import logger
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check(db: Session = Depends(get_db)) -> HealthResponse:
    """
    Health check endpoint to verify API runtime, configuration, and database connectivity.
    """
    db_connected = False
    try:
        db.execute(text("SELECT 1"))
        db_connected = True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")

    return HealthResponse(
        status="ok" if db_connected else "degraded",
        service=settings.APP_NAME,
        version="0.1.0",
        environment=settings.APP_ENV,
        database_connected=db_connected,
        timestamp=datetime.now(timezone.utc),
    )
