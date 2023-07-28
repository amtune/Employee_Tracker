const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv");

const db = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
});

db.connect(function (err) {
	if (err) throw err;
	console.log("MySQL Connected");
	start();
});

function start() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "choice",
				message: "What would you like to do?",
				choices: [
					"View all Departments",
					"View all Roles",
					"View all Employees",
					"Add Department",
					"Add Role",
					"Add Employee",
					"Update Employee"
				],
			},
		])
		.then((res) => {
			if (res.choice === "View all Departments") {
				allDepartments();
			} else if (res.choice === "View all Roles") {
				allRoles();
			} else if (res.choice === "View all Employees") {
				allEmployees();
			} else if (res.choice === "Add Department") {
				addDepartment();
			} else if (res.choice === "Add Role") {
				addRole();
			} else if (res.choice === "Add Employee") {
				addEmployee();
			} else if (res.choice === "Update Employee") {
				updateEmployee();
			}
		});
}

start()
