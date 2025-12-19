# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.contrib.auth import get_user_model
# from .models import Chat, Message

# User = get_user_model()


# class ChatConsumer(AsyncWebsocketConsumer):

#     async def connect(self):
#         self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
#         self.room_group_name = f"chat_{self.chat_id}"

#         user = self.scope.get("user")

#         # ❌ Reject unauthenticated users
#         if not user or not user.is_authenticated:
#             await self.close()
#             return

#         # ❌ Reject if user not part of chat
#         is_allowed = await self.is_user_allowed(user, self.chat_id)
#         if not is_allowed:
#             await self.close()
#             return

#         # ✅ Accept connection
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         message = data.get("message")

#         user = self.scope["user"]

#         msg_obj = await self.save_message(
#             chat_id=self.chat_id,
#             user=user,
#             message=message
#         )

#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "chat_message",
#                 "message": msg_obj.text,
#                 "sender": user.username,
#                 "message_id": msg_obj.id,
#             }
#         )

#     async def chat_message(self, event):
#         await self.send(text_data=json.dumps({
#             "message": event["message"],
#             "sender": event["sender"],
#             "message_id": event["message_id"],
#         }))

#     # ===========================
#     # 🔐 PERMISSION CHECK
#     # ===========================
#     @database_sync_to_async
#     def is_user_allowed(self, user, chat_id):
#         try:
#             chat = Chat.objects.get(id=chat_id)
#             return chat.participants.filter(id=user.id).exists()
#         except Chat.DoesNotExist:
#             return False

#     # ===========================
#     # 💾 SAVE MESSAGE
#     # ===========================
#     @database_sync_to_async
#     def save_message(self, chat_id, user, message):
#         chat = Chat.objects.get(id=chat_id)
#         return Message.objects.create(
#             chat=chat,
#             sender=user,
#             text=message
#         )


# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.contrib.auth import get_user_model
# from .models import Chat, Message

# User = get_user_model()


# class ChatConsumer(AsyncWebsocketConsumer):

#     # =========================
#     # CONNECT
#     # =========================
#     async def connect(self):
#         self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
#         self.room_group_name = f"chat_{self.chat_id}"
#         self.user = self.scope.get("user")

#         if not self.user or not self.user.is_authenticated:
#             await self.close()
#             return

#         is_allowed = await self.is_user_allowed(self.user, self.chat_id)
#         if not is_allowed:
#             await self.close()
#             return

#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         await self.accept()

#     # =========================
#     # DISCONNECT
#     # =========================
#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     # =========================
#     # RECEIVE
#     # =========================
#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         event_type = data.get("type")

#         # 1️⃣ SEND MESSAGE
#         if event_type == "message":
#             await self.handle_message(data)

#         # 2️⃣ MARK SEEN
#         elif event_type == "seen":
#             await self.handle_seen()

#     # =========================
#     # SEND MESSAGE
#     # =========================
#     async def handle_message(self, data):
#         message_text = data.get("message")
#         if not message_text:
#             return

#         msg = await self.save_message(
#             chat_id=self.chat_id,
#             sender=self.user,
#             text=message_text
#         )

#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "chat_message",
#                 "message_id": msg.id,
#                 "message": msg.text,
#                 "sender_id": self.user.id,
#                 "sender_username": self.user.username,
#                 "is_delivered": msg.is_delivered,
#                 "is_seen": msg.is_seen,
#                 "created_at": msg.created_at.isoformat(),
#             }
#         )

#     async def chat_message(self, event):
#         await self.send(text_data=json.dumps(event))

#     # =========================
#     # MARK MESSAGES AS SEEN
#     # =========================
#     async def handle_seen(self):
#         updated = await self.mark_messages_seen(
#             chat_id=self.chat_id,
#             user=self.user
#         )

#         if updated:
#             await self.channel_layer.group_send(
#                 self.room_group_name,
#                 {
#                     "type": "seen_update",
#                     "chat_id": self.chat_id,
#                     "seen_by": self.user.id,
#                 }
#             )

#     async def seen_update(self, event):
#         await self.send(text_data=json.dumps(event))

#     # =========================
#     # DATABASE METHODS
#     # =========================
#     @database_sync_to_async
#     def is_user_allowed(self, user, chat_id):
#         return Chat.objects.filter(
#             id=chat_id,
#             participants=user
#         ).exists()

#     @database_sync_to_async
#     def save_message(self, chat_id, sender, text):
#         chat = Chat.objects.get(id=chat_id)
#         message = Message.objects.create(
#         chat=chat,
#         sender=sender,
#         text=text,
#         is_delivered=True
#     )
#         return message

#     @database_sync_to_async
#     def mark_messages_seen(self, chat_id, user):
#         qs = Message.objects.filter(
#             chat_id=chat_id,
#             is_seen=False
#         ).exclude(sender=user)

#         updated = qs.update(is_seen=True)
#         return updated > 0


import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Chat, Message

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.room_group_name = f"chat_{self.chat_id}"

        user = self.scope.get("user")

        if not user or not user.is_authenticated:
            await self.close()
            return

        is_allowed = await self.is_user_allowed(user, self.chat_id)
        if not is_allowed:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get("type")
        user = self.scope["user"]

        # ==========================
        # 💬 SEND MESSAGE
        # ==========================
        if event_type == "message":
            message_text = data.get("message")

            msg_obj = await self.save_message(
                chat_id=self.chat_id,
                sender=user,
                text=message_text
            )

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": msg_obj.text,
                    "sender": user.username,
                    "sender_id": user.id,
                    "message_id": msg_obj.id,
                }
            )

        # ==========================
        # ✍️ TYPING START
        # ==========================
        elif event_type == "typing_start":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "typing",
                    "user_id": user.id,
                    "username": user.username,
                    "is_typing": True,
                }
            )

        # ==========================
        # 🛑 TYPING STOP
        # ==========================
        elif event_type == "typing_stop":
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "typing",
                    "user_id": user.id,
                    "username": user.username,
                    "is_typing": False,
                }
            )

    # ==========================
    # 📩 CHAT MESSAGE HANDLER
    # ==========================
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"],
            "sender": event["sender"],
            "sender_id": event["sender_id"],
            "message_id": event["message_id"],
        }))

    # ==========================
    # ✍️ TYPING HANDLER
    # ==========================
    async def typing(self, event):
        user = self.scope["user"]

        # ❌ Do not send typing event to sender
        if user.id == event["user_id"]:
            return

        await self.send(text_data=json.dumps({
            "type": "typing",
            "user_id": event["user_id"],
            "username": event["username"],
            "is_typing": event["is_typing"],
        }))

    # ==========================
    # 🔐 PERMISSIONS
    # ==========================
    @database_sync_to_async
    def is_user_allowed(self, user, chat_id):
        return Chat.objects.filter(
            id=chat_id,
            participants=user
        ).exists()

    # ==========================
    # 💾 SAVE MESSAGE
    # ==========================
    @database_sync_to_async
    def save_message(self, chat_id, sender, text):
        chat = Chat.objects.get(id=chat_id)
        return Message.objects.create(
            chat=chat,
            sender=sender,
            text=text,
            is_delivered=True
        )
