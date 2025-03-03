const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["pending", "progress", "done"], default: "pending" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
