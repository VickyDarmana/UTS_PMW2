const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
