const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

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
					"Update Employee",
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

start();

function allDepartments() {
	const query = `SELECT * FROM department`;
	db.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
		start();
	});
}

function allRoles() {
	const query = `SELECT * FROM roles`;
	db.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
		start();
	});
}

function allEmployees() {
	const query = `SELECT * FROM employee`;
	db.query(query, function (err, res) {
		if (err) throw err;
		console.table(res);
		start();
	});
}

function addDepartment() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of the department?",
			},
		])
		.then((res) => {
			const query = `INSERT INTO department SET ?`;
			db.query(query, {
				department_name: res.name,
			});
			console.log(`Added ${res.name} to the database`);
			start();
		});
}

function addRole() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "title",
				message: "What is the name of the role?",
			},
			{
				type: "input",
				name: "salary",
				message: "What is the salary of the role?",
			},
			{
				type: "input",
				name: "departmentId",
				message: "Which department does the role belong to?",
			},
		])
		.then((res) => {
			const query = `INSERT INTO roles SET ?`;
			db.query(query, {
				title: res.title,
				salary: res.salary,
				department_id: res.departmentId,
			});
			console.log(`Added ${res.title} to the database`);
			start();
		});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "firstName",
				message: "What is the employee's first name?",
			},
			{
				type: "input",
				name: "lastName",
				message: "What is the employee's last name?",
			},
			{
				type: "input",
				name: "employeeRole",
				message: "What is the employee's role id?",
			},
			{
				type: "input",
				name: "manager",
				message: "What is the employee's manager id?",
			},
		])
		.then((res) => {
			const query = `INSERT INTO employee SET ?`;
			db.query(query, {
				first_name: res.firstName,
				last_name: res.lastName,
				role_id: res.employeeRole,
				manager_id: res.manager,
			});
			console.log(`Added ${res.firstName} to the database`);
			start();
		});
}

function updateEmployee() {
	const employeeSql = `SELECT * FROM employee`;
	db.query(employeeSql, (err, data) => {
		if (err) throw err;
		const employees = data.map(({ id, first_name, last_name }) => ({
			name: first_name + " " + last_name,
			value: id,
		}));
		inquirer
			.prompt([
				{
					type: "list",
					name: "name",
					message: "Which employee would you like to update?",
					choices: employees,
				},
			])
			.then((empChoice) => {
				const employee = empChoice.name;
				const params = [];
				params.push(employee);
				const roleSql = `SELECT * FROM roles`;
				db.query(roleSql, (err, data) => {
					if (err) throw err;
					const roles = data.map(({ id, title }) => ({
						name: title,
						value: id,
					}));
					inquirer
						.prompt([
							{
								type: "list",
								name: "role",
								message: "What is the employee's new role?",
								choices: roles,
							},
						])
						.then((roleChoice) => {
							const role = roleChoice.role;
							params.push(role);
							let employee = params[0];
							params[0] = role;
							params[1] = employee;
							const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
							db.query(sql, params, (err, result) => {
								if (err) throw err;
								console.log("Employee has been updated!");
								start();
							});
						});
				});
			});
	});
}
