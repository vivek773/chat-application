from rest_framework import serializers
from .models import Chat, Message
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "sender",
            "text",
            "created_at",
            "is_delivered",
            "is_seen",
        ]


class ChatSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = [
            "id",
            "participants",
            "is_group",
            "name",
            "created_at",
            "last_message",
        ]

    def get_last_message(self, obj):
        message = obj.messages.order_by("-created_at").first()
        if message:
            return MessageSerializer(message).data
        return None
