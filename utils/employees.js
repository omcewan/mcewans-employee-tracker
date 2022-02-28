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

async function updateEmployee(employee, manager) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `UPDATE employees
  SET manager_id = ${manager}
  WHERE id = ${employee} `;

  // TODO: fix the error that shows up with an invalid manager id
  const [results] = await connection.execute(sql);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
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
  }
  connection.end();
}

async function addEmployee() {
  
}

async function deleteEmployee(employee) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `DELETE FROM employees
  WHERE id = ${employee} `;

  const [results] = await connection.execute(sql);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
    const sql = `SELECT E.id, E.first_name, E.last_name, roles.title AS title,
    departments.department_name AS department, roles.salary,  CONCAT (M.first_name,' ', M.last_name) AS manager
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
  }
  connection.end();
}

module.exports = {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployee,
  deleteEmployee,
};
