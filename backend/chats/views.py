from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from users.models import User


# 1️⃣ Get all chats of logged-in user
@api_view(["GET"])
def my_chats(request):
    chats = Chat.objects.filter(participants=request.user).order_by("-created_at")
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)


# 2️⃣ Create chat (1-1 or group)
@api_view(["POST"])
def create_chat(request):
    participant_ids = request.data.get("participants", [])
    is_group = request.data.get("is_group", False)
    name = request.data.get("name", "")

    if not participant_ids:
        return Response(
            {"error": "Participants required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    chat = Chat.objects.create(
        is_group=is_group,
        name=name if is_group else None,
    )

    chat.participants.add(request.user)

    users = User.objects.filter(id__in=participant_ids)
    chat.participants.add(*users)

    return Response(ChatSerializer(chat).data, status=status.HTTP_201_CREATED)


# 3️⃣ Send message
@api_view(["POST"])
def send_message(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)

    text = request.data.get("text", "")
    if not text:
        return Response(
            {"error": "Message text is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    message = Message.objects.create(
        chat=chat,
        sender=request.user,
        text=text,
        is_delivered=True,  # initial state
    )

    return Response(
        MessageSerializer(message).data,
        status=status.HTTP_201_CREATED,
    )


# 4️⃣ Get messages of a chat
@api_view(["GET"])
def chat_messages(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)

    messages = chat.messages.order_by("created_at")
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
