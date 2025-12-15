import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectSocket, disconnectSocket } from "@/services/socketService";
import { addMessage } from "@/redux/slices/messageSlice";

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token") || "dummy-token";
    const socket = connectSocket(token);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Example payload from backend
      // { chatId, message }

      dispatch(addMessage({
        chatId: data.chatId,
        message: data.message
      }));
    };

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);
};
