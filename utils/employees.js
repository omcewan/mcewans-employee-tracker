const mysql = require("mysql2/promise");
const cTable = require("console.table");

async function getEmployees() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary, CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id`;

  const [results] = await connection.execute(sql);
  const allEmployees = cTable.getTable(results);
  console.log(allEmployees);
  connection.end();
}

async function employeesByManager() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id
  ORDER BY manager`;

  const [results] = await connection.execute(sql);
  const employeesByManager = cTable.getTable(results);
  console.log(employeesByManager);
  connection.end();
}

async function employeesByDepartment() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id
  ORDER BY department`;

  const [results] = await connection.execute(sql);
  const employeesByDepartment = cTable.getTable(results);
  console.log(employeesByDepartment);
  connection.end();
}

async function updateEmployeeManager(employee, manager) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `UPDATE employees
  SET manager_id = ${manager}
  WHERE id = ${employee}`,
    `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id
  ORDER BY manager`,
  ];

  // TODO: fix the error that shows up with an invalid manager id
  const [results] = await connection.execute(sql[0]);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
    const [results] = await connection.execute(sql[1]);
    const employeesByManager = cTable.getTable(results);
    console.log(employeesByManager);
  }
  connection.end();
}

async function updateEmployeeRole(employee, role) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `UPDATE employees
  SET role_id = ${role}
  WHERE id = ${employee}`,
    `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id`,
  ];

  // TODO: fix the error that shows up with an invalid manager id
  const [results] = await connection.execute(sql[0]);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
    const [results] = await connection.execute(sql[1]);
    const allEmployees = cTable.getTable(results);
    console.log(allEmployees);
  }
  connection.end();
}

async function addEmployee(first, last, role, manager) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ('${first}', '${last}', ${role}, ${manager})`,
    `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
    departments.department_name AS department, roles.salary, CONCAT (M.first_name,' ', M.last_name) AS manager
    FROM employees E
    LEFT JOIN roles 
    ON E.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees M
    ON M.id = E.manager_id`,
  ];

  const [result] = await connection.query(sql[0]);
  // if (!result.affectedRows) {
  //   console.log({ message: "already exists!" });
  // }

  const [results] = await connection.execute(sql[1]);
  const allEmployees = cTable.getTable(results);
  console.log(allEmployees);
  connection.end();
}

async function deleteEmployee(employee) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `DELETE FROM employees
  WHERE id = ${employee} `,
    `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
  departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id`,
  ];

  const [results] = await connection.execute(sql[0]);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
    const [results] = await connection.execute(sql[1]);
    const allEmployees = cTable.getTable(results);
    console.log(allEmployees);
  }
  connection.end();
}

module.exports = {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployeeManager,
  deleteEmployee,
  addEmployee,
  updateEmployeeRole,
};
