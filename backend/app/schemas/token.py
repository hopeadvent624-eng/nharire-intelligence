from typing import Optional
from pydantic import BaseModel, EmailStr


class FirebaseUserClaims(BaseModel):
    uid: str
    email: Optional[EmailStr] = None
    email_verified: Optional[bool] = False
    name: Optional[str] = None
    picture: Optional[str] = None
