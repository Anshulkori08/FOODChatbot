const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // replace with your MySQL username
    password: "",      // replace with your MySQL password
    database: "foodchatbot"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected...");
});

// Save form data
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        res.json({ success: true, id: result.insertId });
    });
});

// Fetch data for admin panel
app.get("/api/contacts", (req, res) => {
    db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});