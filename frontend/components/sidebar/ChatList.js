import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const chats = useSelector((state) => state.chat.chats);

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
