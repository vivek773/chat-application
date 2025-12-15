// import MessageItem from "./MessageItem";

// const dummyMessages = [
//   { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
//   { id: 2, text: "Hi, how are you?", sent: true, time: "10:31 AM" },
//   { id: 3, text: "I'm good, thanks!", sent: false, time: "10:32 AM" },
// ];

// export default function MessageList() {
//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-3 bg-chat-light dark:bg-chat-dark">
//       {dummyMessages.map((msg) => (
//         <MessageItem key={msg.id} msg={msg} />
//       ))}
//     </div>
//   );
// }

// import { useSelector } from "react-redux";
// import MessageItem from "./MessageItem";

// export default function MessageList() {
//   const { activeChatId } = useSelector((state) => state.chat);

//   if (!activeChatId) {
//     return (
//       <div className="flex-1 flex items-center justify-center text-gray-500">
//         Select a chat to start messaging
//       </div>
//     );
//   }

//   const messagesByChat = {
//     1: [
//       { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
//       { id: 2, text: "Hi, how are you?", sent: true, time: "10:31 AM" },
//     ],
//     2: [
//       { id: 1, text: "Beta khana kha liya?", sent: false, time: "9:20 AM" },
//     ],
//     3: [
//       { id: 1, text: "Review the PR", sent: false, time: "Yesterday" },
//     ],
//   };

//   const messages = messagesByChat[activeChatId] || [];

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-3 bg-chat-light dark:bg-chat-dark">
//       {messages.map((msg) => (
//         <MessageItem key={msg.id} msg={msg} />
//       ))}
//     </div>
//   );
// }

// import { useSelector } from "react-redux";
// import MessageItem from "./MessageItem";

// export default function MessageList() {
//   const { chats, activeChatId } = useSelector((state) => state.chat);

//   const activeChat = chats.find((c) => c.id === activeChatId);

//   if (!activeChat) {
//     return (
//       <div className="flex-1 flex items-center justify-center text-gray-500">
//         Select a chat to start messaging
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-3 bg-chat-light dark:bg-chat-dark">
//       {activeChat.messages.map((msg) => (
//         <MessageItem key={msg.id} msg={msg} />
//       ))}
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

export default function MessageList() {
  const { chats, activeChatId } = useSelector((state) => state.chat);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-chat-light dark:bg-chat-dark">
      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
