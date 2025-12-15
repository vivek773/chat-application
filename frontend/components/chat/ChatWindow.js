// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import MessageInput from "./MessageInput";

// export default function ChatWindow() {
//   return (
//     <div className="flex-1 flex flex-col bg-gray-200 dark:bg-[#0b141a]">
//       <ChatHeader />
//       <MessageList />
//       <MessageInput />
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { receiveMessage } from "@/redux/slices/chatSlice";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const activeChatId = useSelector((state) => state.chat.activeChatId);

  /**
   * 🔹 Simulate incoming WebSocket message
   * (Later replace this with real socket.on("message"))
   */
  useEffect(() => {
    if (!activeChatId) return;

    const timer = setTimeout(() => {
      dispatch(
        receiveMessage({
          chatId: activeChatId,
          text: "Incoming message 👋",
        })
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeChatId, dispatch]);

  /**
   * 🔹 Desktop placeholder when no chat selected
   */
  if (!activeChatId) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-200 dark:bg-[#0b141a]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  /**
   * 🔹 Active chat UI
   */
  return (
    <div className="flex-1 flex flex-col bg-gray-200 dark:bg-[#0b141a]">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
}
