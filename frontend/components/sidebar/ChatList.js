import ChatItem from "./ChatItem";

const dummyChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, what's up?",
    time: "10:45 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Mom",
    lastMessage: "Beta khana kha liya?",
    time: "9:20 AM",
    unread: 0,
  },
  {
    id: 3,
    name: "Frontend Team",
    lastMessage: "Review the PR",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: 4,
    name: "John Doe",
    lastMessage: "Hey, what's up?",
    time: "10:45 AM",
    unread: 2,
  },
  {
    id: 5,
    name: "Mom",
    lastMessage: "Beta khana kha liya?",
    time: "9:20 AM",
    unread: 0,
  },
  {
    id: 6,
    name: "Frontend Team",
    lastMessage: "Review the PR",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: 7,
    name: "John Doe",
    lastMessage: "Hey, what's up?",
    time: "10:45 AM",
    unread: 2,
  },
  {
    id: 8,
    name: "Mom",
    lastMessage: "Beta khana kha liya?",
    time: "9:20 AM",
    unread: 0,
  },
  {
    id: 9,
    name: "Frontend Team",
    lastMessage: "Review the PR",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: 10,
    name: "John Doe",
    lastMessage: "Hey, what's up?",
    time: "10:45 AM",
    unread: 2,
  },
  {
    id: 11,
    name: "Mom",
    lastMessage: "Beta khana kha liya?",
    time: "9:20 AM",
    unread: 0,
  },
  {
    id: 12,
    name: "Frontend Team",
    lastMessage: "Review the PR",
    time: "Yesterday",
    unread: 1,
  },
];

export default function ChatList() {
  return (
    <div className="overflow-y-auto h-full">
      {dummyChats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
