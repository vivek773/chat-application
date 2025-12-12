import axiosInstance from "./axiosInstance";

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/auth/login/", payload);
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/auth/register/", payload);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await axiosInstance.get("/auth/profile/");
  return response.data;
};
