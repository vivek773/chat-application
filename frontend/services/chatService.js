import axiosInstance from "./axiosInstance";

export const fetchChats = async () => {
  const response = await axiosInstance.get("/chats/");
  return response.data;
};

export const createChat = async (payload) => {
  const response = await axiosInstance.post("/chats/create/", payload);
  return response.data;
};

export const fetchChatDetails = async (chatId) => {
  const response = await axiosInstance.get(`/chats/${chatId}/`);
  return response.data;
};
