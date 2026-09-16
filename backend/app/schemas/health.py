from datetime import datetime
from pydantic import BaseModel, ConfigDict


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    environment: str
    database_connected: bool
    timestamp: datetime

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "status": "ok",
                "service": "Nharire Intelligence API",
                "version": "0.1.0",
                "environment": "development",
                "database_connected": True,
                "timestamp": "2026-09-16T12:00:00Z",
            }
        }
    )
