export default function MessageItem({ msg }) {
  const bubbleClasses = msg.sent
    ? "bg-green-300 dark:bg-green-700 text-black dark:text-white ml-auto"
    : "bg-white dark:bg-[#202c33] text-black dark:text-white mr-auto";

  return (
    <div className={`max-w-[75%] rounded-lg px-3 py-2 mb-2 shadow ${bubbleClasses}`}>
      <p className="text-sm">{msg.text}</p>
      <span className="text-[10px] text-gray-600 dark:text-gray-300 float-right mt-1">
        {msg.time}
      </span>
    </div>
  );
}
