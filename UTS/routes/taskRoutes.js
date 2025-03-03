const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Show Dashboard (Home Page)
router.get("/", authMiddleware, taskController.getTasks);

// Create Task
router.post("/", authMiddleware, taskController.createTask);

// Show Edit Task Form
router.get("/edit/:id", authMiddleware, taskController.editTaskForm);

// Update Task
router.post("/update/:id", authMiddleware, taskController.updateTask);

// Delete Task
router.post("/delete/:id", authMiddleware, taskController.deleteTask);

router.post("/", async (req, res) => {
    try {
        const { title, category, deadline, status } = req.body;
        const newTask = new Task({ title, category, deadline, status });
        await newTask.save();

        // Emit event ke WebSocket untuk semua klien
        req.io.emit("newTask", { message: `New task added: ${title}` });

        res.redirect("/tasks");
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
