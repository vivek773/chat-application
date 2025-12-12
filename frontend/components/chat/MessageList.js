import MessageItem from "./MessageItem";

const dummyMessages = [
  { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
  { id: 2, text: "Hi, how are you?", sent: true, time: "10:31 AM" },
  { id: 3, text: "I'm good, thanks!", sent: false, time: "10:32 AM" },
];

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-chat-light dark:bg-chat-dark">
      {dummyMessages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}
    </div>
  );
}
