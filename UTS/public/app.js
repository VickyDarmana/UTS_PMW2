const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mahasiswaRoutes = require("../routes/routes");
require("../config/database"); // Koneksi ke database

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "utsproject",
});

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use("/mahasiswa", routes);

app.get("/", (req, res) => {
    res.redirect("/mahasiswa");
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
log(`Server is running on port ${PORT}`);