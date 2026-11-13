const jwt = require("jsonwebtoken");
const User = require("../models/User");

const setupChat = (io, events) => {

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Authentication required"));
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user = await User.findById(decoded.id);

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.user = user;
            next();

        } catch (error) {
            next(new Error("Invalid or expired token"));
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.user.name + " connected to chat");

        socket.on("chatMessage", (message) => {
            if (
                typeof message !== "string" ||
                !message.trim() ||
                message.length > 1000
            ) {
                return;
            }

            const chatData = {
                sender: socket.user.name,
                message: message.trim(),
                time: new Date()
            };

            io.emit("receiveMessage", chatData);

            events.emit("newChatMessage", chatData);
        });

        socket.on("disconnect", () => {
            console.log(socket.user.name + " disconnected");
        });
    });
};

module.exports = setupChat;
