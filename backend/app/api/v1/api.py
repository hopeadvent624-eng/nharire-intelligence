from fastapi import APIRouter
from app.api.v1.endpoints import health, organizations, workspaces, users

api_router = APIRouter()

# Include versioned routers
api_router.include_router(health.router, prefix="", tags=["Health"])
api_router.include_router(organizations.router, prefix="/organizations", tags=["Organizations"])
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["Workspaces"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
