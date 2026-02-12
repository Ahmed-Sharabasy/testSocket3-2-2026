# Real-time Chat Application

A simple and efficient real-time chat application built with Node.js, Express, and Socket.IO. This application allows users to join specific chat rooms or broadcast messages to all connected users.

## Features

- **Real-time Messaging**: Instant message delivery using WebSocket technology.
- **Room Support**: Join and leave specific chat rooms to talk with a subset of users.
- **Broadcasting**: Send messages to all connected users if not in a specific room.
- **Connection Status**: Visual indicators for connection status (Connected/Disconnected).
- **User Notifications**: Alerts when users join or leave a room.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Real-time Engine**: Socket.IO
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: Mongoose (included in dependencies, potentially for future expansion)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (which comes with npm).

## Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/chatapp-socketio.git
    cd chatapp-socketio
    ```

2.  **Install Server Dependencies**
    Navigate to the `server` directory and install the necessary packages.
    ```bash
    cd server
    npm install
    ```

## Usage

1.  **Start the Server**
    Run the following command in the `server` directory:

    ```bash
    npm start
    ```

    The server will start running on port 3000 (or the port defined in your environment variables).

2.  **Access the Application**
    Open your web browser and navigate to:

    ```
    http://localhost:3000
    ```

3.  **Chatting**
    - Enter a message and click "Send" to broadcast to everyone.
    - Enter a room name and click "Join Room" to enter a private channel.
    - Send messages within the room.
    - Click "Leave Room" to exit the private channel.

## Project Structure

```
chatApp-SocketIO/
├── app/                  # Frontend files
│   ├── index.html        # Main HTML file
│   ├── script.js         # Frontend logic (Socket.IO client)
│   └── style.css         # Styles
├── server/               # Backend files
│   ├── server.js         # Express server & Socket.IO logic
│   ├── package.json      # Dependencies and scripts
│   └── node_modules/     # Installed packages
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Contributing

Contributions are always welcome!

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

Distributed under the ISC License. See `LICENSE` for more information.
