from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings
from app.core.logging import logger

connect_args = {}
db_url = settings.DATABASE_URL

if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(
        db_url,
        connect_args=connect_args,
        pool_pre_ping=True,
        echo=False,
    )
    # Test connection early in development
    if not db_url.startswith("sqlite"):
        with engine.connect() as conn:
            pass
except (OperationalError, Exception) as e:
    if settings.APP_DEBUG or settings.APP_ENV == "development":
        logger.warning(
            f"Configured database ({db_url}) unreachable ({e}). Falling back to local SQLite (sqlite:///./nharire_dev.db) for development."
        )
        db_url = "sqlite:///./nharire_dev.db"
        connect_args = {"check_same_thread": False}
        engine = create_engine(
            db_url,
            connect_args=connect_args,
            pool_pre_ping=True,
            echo=False,
        )
    else:
        raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """Dependency that yields an active database session and ensures proper closure."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
