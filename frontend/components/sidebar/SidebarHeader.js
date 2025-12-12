// import ThemeToggle from "../ThemeToggle";
import { MessageCircle } from "react-feather";
import ThemeToggle from "../chat/ThemeToggle";

export default function SidebarHeader() {
  return (
    <div className="h-16 px-4 flex items-center justify-between bg-gray-100 dark:bg-[#202c33] border-b border-gray-300 dark:border-gray-700">
      <div className="text-xl font-semibold dark:text-white">Chats</div>

      <div className="flex items-center gap-3">
        <MessageCircle size={22} className="text-gray-600 dark:text-gray-300" />
        <ThemeToggle />
      </div>
    </div>
  );
}
