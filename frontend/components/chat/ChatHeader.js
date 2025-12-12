import { ArrowLeft } from "react-feather";

export default function ChatHeader() {
  return (
    <div className="h-16 px-4 flex items-center bg-gray-100 dark:bg-[#202c33] border-b border-gray-300 dark:border-gray-700">

      {/* Mobile back button */}
      <button className="md:hidden mr-3">
        <ArrowLeft size={22} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>

      {/* Name + status */}
      <div className="ml-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">John Doe</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          online
        </p>
      </div>
    </div>
  );
}
