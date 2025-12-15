import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";

// export default function Sidebar() {
//   return (
//     <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111b21] h-full flex flex-col">
//       <SidebarHeader />
//       <ChatList />
//     </div>
//   );
// }

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111b21]">
      <SidebarHeader />
      <ChatList />
    </div>
  );
}

