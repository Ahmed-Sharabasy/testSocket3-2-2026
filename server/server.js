import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// init express + socket.io
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Broadcast message to everyone (no room)
  socket.on("message", (text) => {
    socket.broadcast.emit("message", text);
  });

  // Join a room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`Client ${socket.id} joined room: ${roomName}`);
    socket.emit("roomJoined", roomName);
  });

  // Send message to a specific room (excluding sender)
  socket.on("roomMessage", (data) => {
    if (!data || !data.room) return; // guard against bad data
    socket.broadcast.to(data.room).emit("roomMessage", {
      room: data.room,
      text: data.text,
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Serve static files from "app" directory
app.use(express.static("../app"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "../app" });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
