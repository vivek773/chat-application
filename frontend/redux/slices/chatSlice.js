import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [
      { id: 1, name: "John Doe", lastMessage: "Hello!", unread: 2 },
      { id: 2, name: "Sarah Smith", lastMessage: "What's up?", unread: 0 },
    ],
    activeChatId: null,
  },
  reducers: {
    selectChat(state, action) {
      state.activeChatId = action.payload; // chat ID
    },
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
