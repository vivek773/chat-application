import { Send } from "react-feather";
import { useState } from "react";

export default function MessageInput() {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    console.log("Message sent:", text);
    setText("");
  };

  return (
    <div className="h-16 flex items-center gap-3 px-4 bg-gray-100 dark:bg-[#202c33] border-t border-gray-300 dark:border-gray-700">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-[#2a3942] text-gray-900 dark:text-white outline-none"
      />

      <button
        onClick={sendMessage}
        className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
