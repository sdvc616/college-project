const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);


db.connect((err) => {

    if (err) {
        console.log("❌ Database Error");
        console.log(err);
    } 
    else {
        console.log("✅ MySQL Connected");
    }

});

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Backend Running");
});

// GET STUDENTS
app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {

        if (err) {

            res.json({
                success: false,
                error: err
            });

        } 
        else {

            res.json(result);

        }

    });

});

// ADD STUDENT
app.post("/add-student", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;

    const sql = "INSERT INTO students (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {

        if (err) {

            res.json({
                success: false
            });

        } 
        else {

            res.json({
                success: true
            });

        }

    });

});

// LOGIN
app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {

            res.json({
                success: false
            });

        } 
        else {

            if (result.length > 0) {

                res.json({
                    success: true
                });

            } 
            else {

                res.json({
                    success: false
                });

            }

        }

    });

});
app.get("/test-login", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

        if (err) {
            res.json(err);
        } 
        else {
            res.json(result);
        }

    });

});
// SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Server running on port " + PORT);
});