export default function ChatItem({ chat }) {
  return (
    <div
      className="px-4 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a3942] flex items-center border-b border-gray-200 dark:border-gray-700"
    >
      {/* Profile circle */}
      <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600" />

      {/* Chat details */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold dark:text-white">{chat.name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {chat.time}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {chat.lastMessage}
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
