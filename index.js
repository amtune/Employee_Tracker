const inquirer = require('inquirer');
const mysql = require('mysql2');
require("dotenv")

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    menu();
});