import uuid
from sqlalchemy import Boolean, Column, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    plan = Column(String(50), default="Starter", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    members = relationship(
        "OrganizationMember",
        back_populates="organization",
        cascade="all, delete-orphan",
    )
    workspaces = relationship(
        "Workspace",
        back_populates="organization",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Organization id={self.id} name={self.name} slug={self.slug}>"
