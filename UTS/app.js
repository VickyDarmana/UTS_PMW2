const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketio = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// WebSocket setup
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});
