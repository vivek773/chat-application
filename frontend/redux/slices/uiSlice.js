import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light",
    sidebarOpen: true,
    chatOpen: false,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    openChat(state) {
      state.chatOpen = true;
    },
    closeChat(state) {
      state.chatOpen = false;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleTheme, openChat, closeChat, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
