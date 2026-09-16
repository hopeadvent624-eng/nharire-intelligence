from typing import Generator, Optional
from fastapi import Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.logging import logger
from app.core.security import extract_bearer_token
from app.db.session import get_db
from app.models.user import User
from app.models.organization import Organization
from app.models.workspace import Workspace
from app.models.membership import OrganizationMember, OrganizationRole
from app.services.firebase_auth import get_firebase_auth_service


def get_current_user(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
) -> User:
    """
    Validates Firebase authentication token and retrieves the corresponding application user.
    In local development without Firebase credentials, creates/returns a development user.
    """
    token = extract_bearer_token(authorization)
    auth_service = get_firebase_auth_service()

    if token:
        claims = auth_service.verify_id_token(token)
        if not claims:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials or token expired.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        firebase_uid = claims.get("uid")
        email = claims.get("email", f"{firebase_uid}@example.com")
        full_name = claims.get("name")
        avatar_url = claims.get("picture")

        user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
        if not user:
            user = User(
                firebase_uid=firebase_uid,
                email=email,
                full_name=full_name,
                avatar_url=avatar_url,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    # Development fallback if Firebase is not yet configured with keys
    if not settings.FIREBASE_PROJECT_ID or settings.APP_DEBUG:
        dev_email = "dev@nharire.com"
        dev_uid = "dev-user-local"
        user = db.query(User).filter(User.firebase_uid == dev_uid).first()
        if not user:
            user = User(
                firebase_uid=dev_uid,
                email=dev_email,
                full_name="Nharire Platform Engineer",
                is_active=True,
                is_superuser=True,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required. Please provide a valid Bearer token.",
        headers={"WWW-Authenticate": "Bearer"},
    )


def verify_organization_access(
    organization_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Organization:
    """Verifies that the current user belongs to the requested organization."""
    org = db.query(Organization).filter(Organization.id == organization_id, Organization.is_active == True).first()
    if not org:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Organization '{organization_id}' not found.",
        )

    # Superuser bypass for platform maintenance
    if current_user.is_superuser:
        return org

    membership = (
        db.query(OrganizationMember)
        .filter(
            OrganizationMember.organization_id == organization_id,
            OrganizationMember.user_id == current_user.id,
            OrganizationMember.is_active == True,
        )
        .first()
    )
    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: User does not belong to this organization.",
        )
    return org


def verify_workspace_access(
    workspace_id: str,
    organization: Organization = Depends(verify_organization_access),
    db: Session = Depends(get_db),
) -> Workspace:
    """Verifies that the requested workspace exists within the authorized organization."""
    workspace = (
        db.query(Workspace)
        .filter(
            Workspace.id == workspace_id,
            Workspace.organization_id == organization.id,
            Workspace.is_active == True,
        )
        .first()
    )
    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Workspace '{workspace_id}' not found in organization '{organization.id}'.",
        )
    return workspace
