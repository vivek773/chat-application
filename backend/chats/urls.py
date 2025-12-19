from django.urls import path
from . import views

urlpatterns = [
    # GET all chats of logged-in user
    path("", views.my_chats, name="my-chats"),

    # POST create new chat
    path("create/", views.create_chat, name="create-chat"),

    # GET messages of a chat
    path("<int:chat_id>/messages/", views.chat_messages, name="chat-messages"),

    # POST send message
    path("<int:chat_id>/send/", views.send_message, name="send-message"),
]
