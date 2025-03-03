require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const db = require("./config/db");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set("view engine", "ejs");


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

app.listen(4000, () => console.log("Server running on http://localhost:4000"));

