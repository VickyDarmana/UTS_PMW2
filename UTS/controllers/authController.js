const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already exists" });

        const user = new User({ username, password });
        await user.save();
        res.status(201).redirect("/auth/login"); // Redirect to login page after registering
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        res.redirect("/tasks"); // Redirect to home page after login
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout User
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth/login");
};
