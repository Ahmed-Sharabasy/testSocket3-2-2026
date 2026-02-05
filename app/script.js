// Connect to your Socket.IO server (change if server runs elsewhere)
const SOCKET_URL = window.location.origin; // "http://localhost:3000" or your server URL

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

const statusEl = document.getElementById("status");
const statusText = statusEl.querySelector(".status-text");
const messagesEl = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

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

// Listen for messages from server (adjust event name to match your server)
socket.on("message", (data) => {
  const text =
    typeof data === "string"
      ? data
      : data.text || data.message || JSON.stringify(data);
  addMessage(text, "received");
});

// Send message on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "sent");
  socket.emit("message", text);
  input.value = "";
});
