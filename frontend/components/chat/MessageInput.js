// import { Send } from "react-feather";
// import { useState } from "react";

// export default function MessageInput() {
//   const [text, setText] = useState("");

//   const sendMessage = () => {
//     if (!text.trim()) return;
//     console.log("Message sent:", text);
//     setText("");
//   };

//   return (
//     <div className="h-16 flex items-center gap-3 px-4 bg-gray-100 dark:bg-[#202c33] border-t border-gray-300 dark:border-gray-700">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type a message"
//         className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-[#2a3942] text-gray-900 dark:text-white outline-none"
//       />

//       <button
//         onClick={sendMessage}
//         className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
//       >
//         <Send size={18} />
//       </button>
//     </div>
//   );
// }

// import { Send } from "react-feather";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage } from "@/redux/slices/messageSlice";
// import { sendSocketMessage } from "@/services/socketService";

// export default function MessageInput() {
//   const [text, setText] = useState("");
//   const dispatch = useDispatch();

//   const activeChatId = useSelector(
//     (state) => state.chat.activeChatId
//   );

//   const sendMessage = () => {
//     if (!text.trim() || !activeChatId) return;

//     const message = {
//       id: Date.now(),
//       text,
//       sent: true,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     // 1️⃣ Update UI instantly
//     dispatch(
//       addMessage({
//         chatId: activeChatId,
//         message,
//       })
//     );

//     // 2️⃣ Send via WebSocket (backend later)
//     sendSocketMessage({
//       type: "chat_message",
//       chatId: activeChatId,
//       text,
//     });

//     setText("");
//   };

//   return (
//     <div className="h-16 flex items-center gap-3 px-4 bg-gray-100 dark:bg-[#202c33] border-t border-gray-300 dark:border-gray-700">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         placeholder="Type a message"
//         className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-[#2a3942] text-gray-900 dark:text-white outline-none"
//       />

//       <button
//         onClick={sendMessage}
//         className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
//       >
//         <Send size={18} />
//       </button>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendMessage } from "@/redux/slices/chatSlice";
// import { Send } from "react-feather";

// export default function MessageInput() {
//   const [text, setText] = useState("");
//   const dispatch = useDispatch();
//   const activeChatId = useSelector((state) => state.chat.activeChatId);

//   const handleSend = () => {
//     if (!text.trim() || !activeChatId) return;

//     dispatch(sendMessage({ chatId: activeChatId, text }));
//     setText("");
//   };

//   return (
//     <div className="p-3 bg-gray-100 dark:bg-[#202c33] flex items-center gap-2">
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         placeholder="Type a message"
//         className="flex-1 px-4 py-2 rounded-full outline-none"
//       />
//       <button
//         onClick={handleSend}
//         className="p-2 bg-green-500 rounded-full text-white"
//       >
//         <Send size={18} />
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/redux/slices/chatSlice";
import { Send } from "react-feather";

export default function MessageInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const activeChatId = useSelector((state) => state.chat.activeChatId);

  const handleSend = () => {
    if (!text.trim() || !activeChatId) return;

    dispatch(sendMessage({ chatId: activeChatId, text }));
    setText("");
  };

  return (
    <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33]">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message"
        className="flex-1 px-4 py-2 rounded-full outline-none bg-white dark:bg-[#2a3942] dark:text-white"
      />

      {/* <button
        onClick={handleSend}
        className="ml-3 bg-green-500 text-white px-4 py-2 rounded-full"
      >
        Send
      </button> */}
      <button
        onClick={handleSend}
        className="ml-3 bg-green-500 text-white px-4 py-2 rounded-full"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
