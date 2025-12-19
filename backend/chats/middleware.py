from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs
import jwt

from channels.db import database_sync_to_async
from users.models import User


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope["query_string"].decode()
        params = parse_qs(query_string)

        token = params.get("token")

        if token:
            try:
                payload = jwt.decode(
                    token[0],
                    settings.SECRET_KEY,
                    algorithms=["HS256"]
                )
                scope["user"] = await get_user(payload["user_id"])
            except Exception:
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)
