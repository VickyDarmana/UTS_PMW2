require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const http = require("http");
const socketio = require("socket.io");
const db = require("./config/db");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set("view engine", "ejs");

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = req.user;
        } catch (error) {
            req.user = null;
            res.locals.user = null;
        }
    } else {
        req.user = null;
        res.locals.user = null;
    }
    next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Home Redirect
app.get("/", (req, res) => res.redirect("/tasks"));

io.on("connection", (socket) => {
    console.log("New WebSocket Connection");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});