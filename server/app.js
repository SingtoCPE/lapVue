const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const { check, validationResult } = require('express-validator');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = 3000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "singto11442525",
  database: "employee"
});
app.get("/employee", (req, res) => {
  let sql = "SELECT * FROM employee.tableEmployee;";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
// ---------------------------------------------------------
app.post("/employee/delete", (req, res) => {
  let sql = `DELETE FROM employee.tableEmployee WHERE id=${req.body.id};`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
// ---------------------------------------------------------
app.post("/employee/add", (req, res) => {
  let sql = `INSERT INTO employee.tableEmployee (first_name, age, position, salary, phone) VALUES ('${req.body.first_name}', 
  ${req.body.age}, '${req.body.position}', ${req.body.salary}, '${req.body.phone}');`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
//------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
