import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";
// import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    theme: themeReducer,
    chat: chatReducer,
    messages: messageReducer,
  },
});
