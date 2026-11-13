
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const EventEmitter = require("events");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const setupChat = require("./sockets/chat");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const events = new EventEmitter();

app.set("events", events);

app.use(cors());
app.use(express.json());


events.on("noteCreated", (id) => {
    console.log("Event: New note created -", id);
});

events.on("newChatMessage", (data) => {
    console.log("Event: New chat message from", data.sender);
});

app.get("/", (req, res) => {
    res.send("Secure Connect Server is Running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

setupChat(io, events);

const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
