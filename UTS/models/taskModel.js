const db = require("../config/db");

const Task = {
  create: async (userId, title, description) => {
    const [result] = await db.promise().query("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)", [userId, title, description]);
    return result.insertId;
  },
  findAllByUserId: async (userId) => {
    const [rows] = await db.promise().query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    return rows;
  },
  update: async (taskId, title, description, completed) => {
    await db.promise().query("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?", [title, description, completed, taskId]);
  },
  delete: async (taskId) => {
    await db.promise().query("DELETE FROM tasks WHERE id = ?", [taskId]);
  },
};

module.exports = Task;
