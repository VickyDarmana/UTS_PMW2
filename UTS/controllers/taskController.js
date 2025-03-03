const Task = require("../models/task");

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user.userId });
        res.render("tasks", { tasks, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, category, deadline, status } = req.body;
        const task = new Task({
            title,
            category,
            deadline,
            status,
            user_id: req.user.userId, // Get user from JWT
        });
        await task.save();
        res.redirect("/tasks"); // Redirect instead of sending JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Show Edit Task Form
exports.editTaskForm = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user_id: req.user.userId });
        if (!task) return res.status(404).send("Task not found");
        res.render("editTask", { task });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { title, category, deadline, status } = req.body;
        await Task.findOneAndUpdate(
            { _id: req.params.id, user_id: req.user.userId },
            { title, category, deadline, status }
        );
        res.redirect("/tasks"); // Redirect instead of sending JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.userId });
        res.redirect("/tasks"); // Redirect instead of sending JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
};
