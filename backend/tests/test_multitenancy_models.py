import uuid
import pytest
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.models.organization import Organization
from app.models.workspace import Workspace
from app.models.membership import OrganizationMember, OrganizationRole


def test_user_creation(db_session):
    """Verify User model creation with Firebase UID."""
    user = User(
        firebase_uid="fb-test-uid-123",
        email="analyst@nharire.com",
        full_name="Tendai Chiwenga",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    assert user.id is not None
    assert user.email == "analyst@nharire.com"
    assert user.is_active is True
    assert user.created_at is not None


def test_organization_and_workspace_hierarchy(db_session):
    """Verify Organization -> Workspace multi-tenant relationship."""
    # 1. Create Organization
    org = Organization(
        name="Harare Logistics Hub",
        slug="harare-logistics",
        plan="Pro",
    )
    db_session.add(org)
    db_session.commit()
    db_session.refresh(org)

    # 2. Create Workspace within Organization
    ws = Workspace(
        organization_id=org.id,
        name="Fleet Analytics",
        slug="fleet-analytics",
        description="Telematics and fuel consumption analysis",
    )
    db_session.add(ws)
    db_session.commit()
    db_session.refresh(ws)

    assert ws.organization_id == org.id
    assert len(org.workspaces) == 1
    assert org.workspaces[0].slug == "fleet-analytics"


def test_membership_and_role_assignment(db_session):
    """Verify User <-> Organization membership and roles."""
    user = User(
        firebase_uid=f"fb-uid-{uuid.uuid4()}",
        email=f"member-{uuid.uuid4()}@nharire.com",
        full_name="Farai Moyo",
    )
    org = Organization(
        name="Bulawayo FMCG Ltd",
        slug=f"bulawayo-fmcg-{uuid.uuid4().hex[:6]}",
        plan="Enterprise",
    )
    db_session.add_all([user, org])
    db_session.commit()

    member = OrganizationMember(
        organization_id=org.id,
        user_id=user.id,
        role=OrganizationRole.ADMIN.value,
    )
    db_session.add(member)
    db_session.commit()
    db_session.refresh(member)

    assert member.role == "ADMIN"
    assert member.user.email == user.email
    assert member.organization.name == "Bulawayo FMCG Ltd"
