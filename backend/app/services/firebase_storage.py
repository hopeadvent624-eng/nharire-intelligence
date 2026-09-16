from typing import Optional, Any
from app.core.config import settings
from app.core.logging import logger

try:
    import firebase_admin
    from firebase_admin import storage
    FIREBASE_STORAGE_AVAILABLE = True
except ImportError:
    FIREBASE_STORAGE_AVAILABLE = False


class FirebaseStorageService:
    """Service foundation for Firebase Storage dataset uploads and asset management."""

    def __init__(self) -> None:
        self._bucket: Optional[Any] = None
        self._initialized: bool = False

    def initialize(self) -> bool:
        """Initialize Firebase Storage bucket connection."""
        if self._initialized:
            return True

        if not FIREBASE_STORAGE_AVAILABLE:
            logger.warning("firebase_admin package is not installed.")
            return False

        if not settings.FIREBASE_STORAGE_BUCKET:
            logger.info("FIREBASE_STORAGE_BUCKET not configured; storage foundation ready for future phase.")
            return False

        try:
            self._bucket = storage.bucket(name=settings.FIREBASE_STORAGE_BUCKET)
            self._initialized = True
            logger.info(f"Firebase Storage bucket initialized: {settings.FIREBASE_STORAGE_BUCKET}")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize Firebase Storage bucket: {e}")
            return False

    @staticmethod
    def get_dataset_blob_path(organization_id: str, workspace_id: str, dataset_id: str, filename: str) -> str:
        """Generates tenant-isolated storage path for uploaded dataset files."""
        safe_filename = filename.replace(" ", "_").lower()
        return f"tenants/{organization_id}/workspaces/{workspace_id}/datasets/{dataset_id}/{safe_filename}"

    def get_bucket(self) -> Optional[Any]:
        if not self._initialized:
            self.initialize()
        return self._bucket


_firebase_storage_service: Optional[FirebaseStorageService] = None


def get_firebase_storage_service() -> FirebaseStorageService:
    global _firebase_storage_service
    if _firebase_storage_service is None:
        _firebase_storage_service = FirebaseStorageService()
    return _firebase_storage_service
