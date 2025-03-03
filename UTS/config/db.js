const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection failed!"));
db.once("open", () => console.log("Connected to MongoDB successfully!"));

module.exports = db;
