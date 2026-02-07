// Connect to your Socket.IO server (change if server runs elsewhere)
const SOCKET_URL = window.location.origin; // "http://localhost:3000" or your server URL

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const statusEl = document.getElementById("status");
const statusText = statusEl.querySelector(".status-text");
const messagesEl = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const roomInput = document.getElementById("roomInput");
const joinRoomBtn = document.getElementById("joinRoomBtn");

let currentRoom = null;

function setStatus(connected) {
  statusEl.classList.remove("connected", "disconnected");
  if (connected) {
    statusEl.classList.add("connected");
    statusText.textContent = "Connected";
    sendBtn.disabled = false;
  } else {
    statusEl.classList.add("disconnected");
    statusText.textContent = "Disconnected";
    sendBtn.disabled = true;
  }
}

function addMessage(text, type = "received") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Connection events
socket.on("connect", () => {
  setStatus(true);
  addMessage("Connected to server", "system");
});

socket.on("disconnect", (reason) => {
  setStatus(false);
  addMessage(`Disconnected: ${reason}`, "system");
});

socket.on("connect_error", (err) => {
  setStatus(false);
  addMessage(`Connection error: ${err.message}`, "system");
});

// Send message on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "sent");

  // Send message to the current room if joined, otherwise broadcast
  if (currentRoom) {
    socket.emit("message", { room: currentRoom, text });
  } else {
    socket.emit("message", text);
  }

  input.value = "";
});

socket.on("message", (data) => {
  addMessage(data, "received");
});

// Room joining functionality
joinRoomBtn.addEventListener("click", () => {
  const roomName = roomInput.value.trim();
  if (!roomName) {
    addMessage("Please enter a room name", "system");
    return;
  }

  socket.emit("joinRoom", roomName);
  roomInput.value = "";
});

socket.on("roomJoined", (room) => {
  currentRoom = room;
  addMessage(`You joined room: ${room}`, "system");
});

socket.on("roomLeft", (room) => {
  addMessage(`You left room: ${room}`, "system");
  if (currentRoom === room) {
    currentRoom = null;
  }
});

socket.on("roomMessage", (data) => {
  addMessage(`[${data.room}] ${data.text}`, "received");
});
