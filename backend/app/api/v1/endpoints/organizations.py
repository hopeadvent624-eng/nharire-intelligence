from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.organization import Organization
from app.models.membership import OrganizationMember, OrganizationRole
from app.schemas.organization import OrganizationCreate, OrganizationResponse

router = APIRouter()


@router.get("/", response_model=List[OrganizationResponse])
def list_organizations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> List[Organization]:
    """Retrieve all organizations where the current user is a member."""
    if current_user.is_superuser:
        return db.query(Organization).filter(Organization.is_active == True).all()

    return (
        db.query(Organization)
        .join(OrganizationMember)
        .filter(
            OrganizationMember.user_id == current_user.id,
            OrganizationMember.is_active == True,
            Organization.is_active == True,
        )
        .all()
    )


@router.post("/", response_model=OrganizationResponse, status_code=status.HTTP_201_CREATED)
def create_organization(
    org_in: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Organization:
    """Create a new tenant organization and assign the creator as OWNER."""
    existing = db.query(Organization).filter(Organization.slug == org_in.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"An organization with slug '{org_in.slug}' already exists.",
        )

    organization = Organization(
        name=org_in.name,
        slug=org_in.slug,
        plan=org_in.plan,
    )
    db.add(organization)
    db.flush()

    # Assign creator as OWNER
    membership = OrganizationMember(
        organization_id=organization.id,
        user_id=current_user.id,
        role=OrganizationRole.OWNER.value,
    )
    db.add(membership)
    db.commit()
    db.refresh(organization)
    return organization
