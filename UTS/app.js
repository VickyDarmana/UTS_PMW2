const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { authenticate } = require('./middlewares/authenticate');

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testingdb",
    });

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', authenticate, taskRoutes); // Protect task routes with authentication

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});