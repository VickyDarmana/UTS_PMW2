const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Ensure this path is correct

// Show Register Page
router.get("/register", (req, res) => {
    res.render("register");
});

// Show Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// Register and Login Routes (Ensure `authController.register` and `authController.login` exist)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Logout Route
router.post("/logout", authController.logout);

module.exports = router;
