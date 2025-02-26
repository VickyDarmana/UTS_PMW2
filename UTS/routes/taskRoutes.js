const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateTask, createTask);
router.get("/", getTasks);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
