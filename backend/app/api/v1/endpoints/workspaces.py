from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user, verify_organization_access
from app.models.user import User
from app.models.organization import Organization
from app.models.workspace import Workspace
from app.schemas.workspace import WorkspaceCreate, WorkspaceResponse

router = APIRouter()


@router.get("/", response_model=List[WorkspaceResponse])
def list_workspaces(
    organization_id: str,
    db: Session = Depends(get_db),
    org: Organization = Depends(verify_organization_access),
    current_user: User = Depends(get_current_user),
) -> List[Workspace]:
    """Retrieve all active workspaces within an authorized organization."""
    return (
        db.query(Workspace)
        .filter(
            Workspace.organization_id == organization_id,
            Workspace.is_active == True,
        )
        .all()
    )


@router.post("/", response_model=WorkspaceResponse, status_code=status.HTTP_201_CREATED)
def create_workspace(
    ws_in: WorkspaceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Workspace:
    """Create a new workspace within an organization that the user is authorized to access."""
    # Verify organization access
    verify_organization_access(ws_in.organization_id, db=db, current_user=current_user)

    existing = (
        db.query(Workspace)
        .filter(
            Workspace.organization_id == ws_in.organization_id,
            Workspace.slug == ws_in.slug,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Workspace with slug '{ws_in.slug}' already exists in this organization.",
        )

    workspace = Workspace(
        organization_id=ws_in.organization_id,
        name=ws_in.name,
        slug=ws_in.slug,
        description=ws_in.description,
    )
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace
