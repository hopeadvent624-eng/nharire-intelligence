from typing import Optional, Dict, Any
from app.core.config import settings
from app.core.logging import logger

try:
    import firebase_admin
    from firebase_admin import auth, credentials
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False


class FirebaseAuthService:
    """Service to handle Firebase Authentication token verification and identity mapping."""

    def __init__(self) -> None:
        self._app: Optional[Any] = None
        self._initialized: bool = False

    def initialize(self) -> bool:
        """Initialize Firebase Admin SDK using environment variables."""
        if self._initialized:
            return True

        if not FIREBASE_AVAILABLE:
            logger.warning("firebase_admin package is not installed.")
            return False

        if not settings.FIREBASE_PROJECT_ID:
            logger.info("FIREBASE_PROJECT_ID not configured; running in unauthenticated development mode.")
            return False

        try:
            if settings.FIREBASE_CLIENT_EMAIL and settings.FIREBASE_PRIVATE_KEY:
                # Format private key replacing escaped newlines
                private_key = settings.FIREBASE_PRIVATE_KEY.replace("\\n", "\n")
                cert_dict = {
                    "type": "service_account",
                    "project_id": settings.FIREBASE_PROJECT_ID,
                    "client_email": settings.FIREBASE_CLIENT_EMAIL,
                    "private_key": private_key,
                }
                cred = credentials.Certificate(cert_dict)
                self._app = firebase_admin.initialize_app(cred, name="nharire_auth")
            else:
                cred = credentials.ApplicationDefault()
                self._app = firebase_admin.initialize_app(cred, {"projectId": settings.FIREBASE_PROJECT_ID}, name="nharire_auth")

            self._initialized = True
            logger.info(f"Firebase Admin Auth successfully initialized for project {settings.FIREBASE_PROJECT_ID}")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize Firebase Admin Auth: {e}")
            return False

    def verify_id_token(self, id_token: str) -> Optional[Dict[str, Any]]:
        """
        Verifies a Firebase ID token.
        Returns decoded claims dict on success, None if verification fails.
        """
        if not self._initialized:
            success = self.initialize()
            if not success:
                logger.warning("Firebase Admin is not configured. Rejecting token verification.")
                return None

        try:
            decoded_claims = auth.verify_id_token(id_token, app=self._app)
            return decoded_claims
        except Exception as e:
            logger.warning(f"Firebase token verification failed: {e}")
            return None


# Global singleton instance
_firebase_auth_service: Optional[FirebaseAuthService] = None


def get_firebase_auth_service() -> FirebaseAuthService:
    global _firebase_auth_service
    if _firebase_auth_service is None:
        _firebase_auth_service = FirebaseAuthService()
    return _firebase_auth_service
