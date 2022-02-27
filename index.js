const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

const initialQuestion = [
  {
    type: "list",
    name: "company",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

async function getEmployees() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary, M.first_name AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id
 `;

  const [rows] = await connection.execute(sql);
  const tableAllEmployees = cTable.getTable(rows);
  console.log(tableAllEmployees);
  connection.end();
}

async function getRoles() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`;

  const [rows] = await connection.execute(sql);
  const tableAllRoles = cTable.getTable(rows);
  console.log(tableAllRoles);
  connection.end();
}

async function getDepartments() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT departments.id, departments.department_name AS department FROM departments`;
  const [rows] = await connection.execute(sql);
  const tableAllDepartments = cTable.getTable(rows);
  console.log(tableAllDepartments);
  connection.end();
}

inquirer.prompt(initialQuestion).then(({ company }) => {
  if (company === "View All Employees") {
    getEmployees();
  }
  if (company === "View All Roles") {
    getRoles();
  }
  if (company === "View All Departments") {
    getDepartments();
  }
  if (company === "Quit") {
    console.log("GoodBye");
  }
});
