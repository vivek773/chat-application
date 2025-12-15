// import { createSlice } from "@reduxjs/toolkit";

// const initialChats = [
//   {
//     id: 1,
//     name: "John Doe",
//     time: "10:45 AM",
//     unread: 2,
//     messages: [
//       { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
//       { id: 2, text: "Hi, how are you?", sent: true, time: "10:31 AM" },
//       { id: 3, text: "I'm good, thanks!", sent: false, time: "10:32 AM" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Mom",
//     time: "9:20 AM",
//     unread: 0,
//     messages: [
//       { id: 1, text: "Beta khana kha liya?", sent: false, time: "9:15 AM" },
//       { id: 2, text: "Haan maa 😊", sent: true, time: "9:17 AM" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Frontend Team",
//     time: "Yesterday",
//     unread: 1,
//     messages: [
//       { id: 1, text: "Please review the PR", sent: false, time: "Yesterday" },
//       { id: 2, text: "Sure, checking 👍", sent: true, time: "Yesterday" },
//     ],
//   },
// ];

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     chats: initialChats,
//     activeChatId: null,
//   },
//   reducers: {
//     selectChat(state, action) {
//       state.activeChatId = action.payload;

//       const chat = state.chats.find((c) => c.id === action.payload);
//       if (chat) chat.unread = 0;
//     },

//     sendMessage(state, action) {
//       const { chatId, text } = action.payload;
//       const chat = state.chats.find((c) => c.id === chatId);

//       if (chat) {
//         chat.messages.push({
//           id: Date.now(),
//           text,
//           sent: true,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         });
//       }
//     },
//   },
// });

// export const { selectChat, sendMessage } = chatSlice.actions;
// export default chatSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [
    {
      id: 1,
      name: "John Doe",
      time: "10:45 AM",
      unread: 2,
      lastMessage: "Hey, what's up?",
      messages: [
        { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
      ],
    },
    {
      id: 2,
      name: "Mom",
      time: "9:20 AM",
      unread: 0,
      lastMessage: "Beta khana kha liya?",
      messages: [],
    },
  ],
  activeChatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat(state, action) {
      state.activeChatId = action.payload;

      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) chat.unread = 0;
    },

    sendMessage(state, action) {
      const { chatId, text } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);

      if (chat) {
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        chat.messages.push({
          id: Date.now(),
          text,
          sent: true,
          time,
        });

        chat.lastMessage = text;
        chat.time = time;
      }
    },
    receiveMessage(state, action) {
  const { chatId, text } = action.payload;
  const chat = state.chats.find(c => c.id === chatId);

  if (chat) {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    chat.messages.push({
      id: Date.now(),
      text,
      sent: false,
      time,
    });

    chat.lastMessage = text;
    chat.time = time;

    if (state.activeChatId !== chatId) {
      chat.unread += 1;
    }
  }
}
  },
});

export const { selectChat, sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
