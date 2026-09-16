from datetime import datetime, timezone
from typing import Any
import uuid
from sqlalchemy import Column, DateTime, String
from sqlalchemy.orm import as_declarative, declared_attr


def generate_uuid() -> str:
    return str(uuid.uuid4())


@as_declarative()
class Base:
    id: Any
    __name__: str

    # Generate __tablename__ automatically from class name (pluralized lowercase)
    @declared_attr
    def __tablename__(cls) -> str:
        name = cls.__name__.lower()
        if name.endswith("y"):
            return name[:-1] + "ies"
        elif not name.endswith("s"):
            return name + "s"
        return name

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
