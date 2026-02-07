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

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data); // Broadcast to all other clients
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
