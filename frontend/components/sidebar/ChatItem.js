// export default function ChatItem({ chat }) {
//   return (
//     <div
//       className="px-4 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a3942] flex items-center border-b border-gray-200 dark:border-gray-700"
//     >
//       {/* Profile circle */}
//       <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600" />

//       {/* Chat details */}
//       <div className="ml-4 flex-1">
//         <div className="flex justify-between">
//           <h3 className="font-semibold dark:text-white">{chat.name}</h3>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {chat.time}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {chat.lastMessage}
//           </p>

//           {chat.unread > 0 && (
//             <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               {chat.unread}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useDispatch } from "react-redux";
// import { selectChat } from "@/redux/slices/chatSlice";
// import { openChat } from "@/redux/slices/uiSlice";

// export default function ChatItem({ chat }) {
//   const dispatch = useDispatch();

//   return (
//     <div
//       onClick={() => {
//         dispatch(selectChat(chat.id));
//         dispatch(openChat()); // mobile behavior
//       }}
//       className="px-4 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a3942] flex items-center border-b border-gray-200 dark:border-gray-700"
//     >
//       <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600" />

//       <div className="ml-4 flex-1">
//         <div className="flex justify-between">
//           <h3 className="font-semibold dark:text-white">{chat.name}</h3>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {chat.time}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {chat.lastMessage}
//           </p>

//           {chat.unread > 0 && (
//             <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               {chat.unread}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useDispatch } from "react-redux";
// import { selectChat } from "@/redux/slices/chatSlice";
// import { openChat } from "@/redux/slices/uiSlice";

// export default function ChatItem({ chat }) {
//   const dispatch = useDispatch();

//   const handleClick = () => {
//     dispatch(selectChat(chat.id));
//     dispatch(openChat()); // mobile only effect
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="px-4 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a3942] flex items-center border-b border-gray-200 dark:border-gray-700"
//     >
//       <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600" />

//       <div className="ml-4 flex-1">
//         <div className="flex justify-between">
//           <h3 className="font-semibold dark:text-white">{chat.name}</h3>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {chat.time}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {chat.lastMessage}
//           </p>

//           {chat.unread > 0 && (
//             <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//               {chat.unread}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "@/redux/slices/chatSlice";
import { openChat } from "@/redux/slices/uiSlice";

export default function ChatItem({ chat }) {
  const dispatch = useDispatch();
  const activeChatId = useSelector((state) => state.chat.activeChatId);

  const isActive = activeChatId === chat.id;

  // ✅ Get last message safely
  const lastMessage =
    chat.messages && chat.messages.length > 0
      ? chat.messages[chat.messages.length - 1]
      : null;

  return (
    <div
      onClick={() => {
        dispatch(selectChat(chat.id));
        dispatch(openChat()); // mobile only
      }}
      className={`
        px-4 py-3 cursor-pointer flex items-center border-b border-gray-200 dark:border-gray-700
        ${
          isActive
            ? "bg-gray-200 dark:bg-[#2a3942]"
            : "hover:bg-gray-100 dark:hover:bg-[#2a3942]"
        }
      `}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600" />

      {/* Chat Details */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold dark:text-white truncate">
            {chat.name}
          </h3>

          {lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
              {lastMessage.time}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {lastMessage
              ? lastMessage.sent
                ? `You: ${lastMessage.text}`
                : lastMessage.text
              : "No messages yet"}
          </p>

          {chat.unread > 0 && (
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
