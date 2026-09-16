from typing import Optional
from fastapi import Header, HTTPException, status
from app.core.config import settings
from app.core.logging import logger


def extract_bearer_token(authorization: Optional[str] = Header(None)) -> Optional[str]:
    """Extract Bearer token from the Authorization header."""
    if not authorization:
        return None
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format. Expected 'Bearer <token>'",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return parts[1]
