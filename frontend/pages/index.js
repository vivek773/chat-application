// import Sidebar from "@/components/sidebar/Sidebar";

// export default function Home() {
//   return (
//     <div className="h-screen flex bg-gray-100 dark:bg-[#0b141a]">
//       <Sidebar />

//       {/* Right side chat window placeholder */}
//       <div className="flex-1 hidden md:flex items-center justify-center text-gray-500 dark:text-gray-300">
//         Select a chat to start messaging
//       </div>
//     </div>
//   );
// }


// import Sidebar from "@/components/sidebar/Sidebar";
// import ChatWindow from "@/components/chat/ChatWindow";

// export default function Home() {
//   return (
//     <div className="h-screen flex bg-gray-200 dark:bg-[#0b141a]">
//       <Sidebar />
//       <div className="flex-1 hidden md:flex">
//         <ChatWindow />
//       </div>
//     </div>
//   );
// }


// import { useSelector } from "react-redux";
// import Sidebar from "@/components/sidebar/Sidebar";
// import ChatWindow from "@/components/chat/ChatWindow";

// export default function Home() {
//   const chatOpen = useSelector((state) => state.ui.chatOpen);

//   return (
//     <div className="h-screen flex bg-gray-200 dark:bg-[#0b141a]">

//       {/* Sidebar */}
//       <div
//         className={`
//           w-full md:w-[30%]
//           ${chatOpen ? "hidden md:block" : "block"}
//         `}
//       >
//         <Sidebar />
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`
//           w-full md:flex md:w-[70%]
//           ${chatOpen ? "flex" : "hidden md:flex"}
//         `}
//       >
//         <ChatWindow />
//       </div>
//     </div>
//   );
// }


// import { useSelector } from "react-redux";
// import Sidebar from "@/components/sidebar/Sidebar";
// import ChatWindow from "@/components/chat/ChatWindow";

// export default function Home() {
//   const chatOpen = useSelector((state) => state.ui.chatOpen);

//   return (
//     <div className="h-screen flex bg-gray-200 dark:bg-[#0b141a]">

//       {/* Sidebar */}
//       <div
//         className={`
//           w-full md:w-[350px] md:block
//           ${chatOpen ? "hidden md:block" : "block"}
//         `}
//       >
//         <Sidebar />
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`
//           flex-1
//           ${chatOpen ? "flex" : "hidden md:flex"}
//         `}
//       >
//         <ChatWindow />
//       </div>
//     </div>
//   );
// }


// import { useSelector } from "react-redux";
// import Sidebar from "@/components/sidebar/Sidebar";
// import ChatWindow from "@/components/chat/ChatWindow";

// export default function Home() {
//   const chatOpen = useSelector((state) => state.ui.chatOpen);

//   return (
//     <div className="h-screen flex bg-gray-200 dark:bg-[#0b141a]">

//       {/* Sidebar */}
//       <div
//         className={`
//           w-full md:w-[350px]
//           ${chatOpen ? "hidden md:block" : "block"}
//         `}
//       >
//         <Sidebar />
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`
//           flex-1
//           ${chatOpen ? "flex" : "hidden md:flex"}
//         `}
//       >
//         <ChatWindow />
//       </div>
//     </div>
//   );
// }

import { useSelector } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  const chatOpen = useSelector((state) => state.ui.chatOpen);

  return (
    <div className="h-screen flex bg-gray-200 dark:bg-[#0b141a]">

      {/* Sidebar */}
      <div
        className={`
          w-full md:w-[350px]
          ${chatOpen ? "hidden md:block" : "block"}
        `}
      >
        <Sidebar />
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1
          ${chatOpen ? "flex" : "hidden md:flex"}
        `}
      >
        <ChatWindow />
      </div>
    </div>
  );
}
