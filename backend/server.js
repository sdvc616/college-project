const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college_db"
});

db.connect((err) => {

    if(err){
        console.log("Database Error");
        console.log(err);
    }
    else{
        console.log("MySQL Connected");
    }

});

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {

        if(err){
            res.json({
                success:false
            });
        }
        else{
            res.json(result);
        }

    });

});
app.use(express.json());

app.post("/add-student", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;

    const sql = "INSERT INTO students (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {

        if(err){

            res.json({
                success:false
            });

        }
        else{

            res.json({
                success:true
            });

        }

    });

});
app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if(err){

            res.json({
                success:false
            });

        }
        else{

            if(result.length > 0){

                res.json({
                    success:true
                });

            }
            else{

                res.json({
                    success:false
                });

            }

        }

    });

});
app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});