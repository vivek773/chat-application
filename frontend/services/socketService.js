let socket = null;

export const connectSocket = (token) => {
  if (socket) return socket;

  socket = new WebSocket(
    `ws://localhost:8000/ws/chat/?token=${token}`
  );

  socket.onopen = () => {
    console.log("🟢 WebSocket connected");
  };

  socket.onclose = () => {
    console.log("🔴 WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendSocketMessage = (data) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};
