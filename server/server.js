import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";

// init socket.io server
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

  socket.emit("welcome-message-from-server", "Welcome!");

  socket.on("sendMessage", (data) => {
    console.log("Received message:", data);

    io.emit("message", data);
  });
});

// render static files from "app" directory
app.use(express.static("../app"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "app" });
});

// lesten for server
// start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
