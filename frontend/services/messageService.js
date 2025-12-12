import axiosInstance from "./axiosInstance";

export const fetchMessages = async (chatId) => {
  const response = await axiosInstance.get(`/messages/${chatId}/`);
  return response.data;
};

export const sendMessageApi = async (payload) => {
  const response = await axiosInstance.post(`/messages/send/`, payload);
  return response.data;
};
