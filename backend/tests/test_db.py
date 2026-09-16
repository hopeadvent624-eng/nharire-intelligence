from sqlalchemy import text
from app.db.session import SessionLocal


def test_database_connection(db_session):
    """Verify that database session can execute standard SQL queries."""
    result = db_session.execute(text("SELECT 1")).scalar()
    assert result == 1
