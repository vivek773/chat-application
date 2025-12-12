import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: {
      1: [
        { id: 1, text: "Hello!", sent: false, time: "10:30 AM" },
        { id: 2, text: "Hi there!", sent: true, time: "10:31 AM" },
      ],
      2: [
        { id: 1, text: "Hey!", sent: false, time: "9:20 AM" }
      ]
    },
  },
  reducers: {
    addMessage(state, action) {
      const { chatId, message } = action.payload;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }

      state.messages[chatId].push(message);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
