// import { ArrowLeft } from "react-feather";

// export default function ChatHeader() {
//   return (
//     <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33] border-b border-gray-300 dark:border-gray-700">

//       {/* Mobile back button */}
//       <button className="md:hidden mr-3">
//         <ArrowLeft size={22} className="text-gray-700 dark:text-gray-300" />
//       </button>

//       {/* Avatar */}
//       <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>

//       {/* Name + status */}
//       <div className="ml-3">
//         <h3 className="font-semibold text-gray-800 dark:text-white">John Doe</h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           online
//         </p>
//       </div>
//     </div>
//   );
// }


// import { ArrowLeft } from "react-feather";
// import { useDispatch } from "react-redux";
// import { closeChat } from "@/redux/slices/uiSlice";

// export default function ChatHeader() {
//   const dispatch = useDispatch();

//   return (
//     <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33] border-b border-gray-300 dark:border-gray-700">

//       {/* Mobile back button */}
//       <button
//         onClick={() => dispatch(closeChat())}
//         className="md:hidden mr-3"
//       >
//         <ArrowLeft size={22} className="text-gray-700 dark:text-gray-300" />
//       </button>

//       <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>

//       <div className="ml-3">
//         <h3 className="font-semibold text-gray-800 dark:text-white">
//           John Doe
//         </h3>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           online
//         </p>
//       </div>
//     </div>
//   );
// }


import { ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { closeChat } from "@/redux/slices/uiSlice";

export default function ChatHeader() {
  const dispatch = useDispatch();
  const { chats, activeChatId } = useSelector((state) => state.chat);

  const activeChat = chats.find((c) => c.id === activeChatId);

  if (!activeChat) {
    return (
      <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33] border-b">
        <p className="text-gray-500">Select a chat</p>
      </div>
    );
  }

  return (
    <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33] border-b border-gray-300 dark:border-gray-700">

      {/* Mobile back button */}
      <button
        onClick={() => dispatch(closeChat())}
        className="md:hidden mr-3"
      >
        <ArrowLeft size={22} className="text-gray-700 dark:text-gray-300" />
      </button>

      <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600" />

      <div className="ml-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {activeChat.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          online
        </p>
      </div>
    </div>
  );
}
