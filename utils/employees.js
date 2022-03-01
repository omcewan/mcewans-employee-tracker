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
  // console.log(results[0].first_name)
  const allEmployees = cTable.getTable(
    "\n\nCurrently Viewing All Employees",
    results
  );
  connection.end();
  return allEmployees;
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
  const employeesByManager = cTable.getTable(
    "\n\nCurrently Viewing All Employees By Manager",
    results
  );
  connection.end();
  return employeesByManager;
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
  const employeesByDepartment = cTable.getTable(
    "\n\nCurrently Viewing All Employees By Department",
    results
  );
  connection.end();
  return employeesByDepartment;
}

async function updateEmployeeManager(employee, manager) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `UPDATE employees
  SET manager_id = ${manager}
  WHERE id = ${employee}`;

  const sql1 = `SELECT e.first_name, e.last_name, CONCAT(m.first_name,' ',m.last_name) as manager FROM employees e
  left join employees m
  on m.id = e.manager_id
  where e.id = ${employee}`;

  // TODO: fix the error that shows up with an invalid manager id
  const [updated] = await connection.execute(sql);

  const [newManager] = await connection.execute(sql1);

  if (!updated.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return newManager;
  }
}

async function updateEmployeeRole(employee, role) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `UPDATE employees SET role_id = ${role} WHERE id = ${employee}`;

  const sql1 = `SELECT E.first_name, E.last_name, roles.title AS title FROM employees E LEFT JOIN roles ON E.role_id = roles.id WHERE E.id = ${employee}`;

  // TODO: fix the error that shows up with an invalid manager id
  const [update] = await connection.execute(sql);

  const [newRole] = await connection.execute(sql1);

  if (!update.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return newRole;
  }
}

async function addEmployee(first, last, role, manager) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ('${first}', '${last}', ${role}, ${manager})`;

  const [result] = await connection.execute(sql);
  console.log(result);

  const sql1 = `SELECT E.first_name, E.last_name, roles.title AS title, CONCAT (M.first_name,' ', M.last_name) AS manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  INNER JOIN employees M
  ON M.id = E.manager_id
  WHERE E.id = ${result.insertId}`;

  const [newEmployee] = await connection.execute(sql1);
  connection.end();
  return newEmployee;
}

async function deleteEmployee(employee) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `DELETE FROM employees WHERE id = ${employee}`;
  const sql1 = `SELECT first_name, last_name FROM employees WHERE id = ${employee}`;

  const [result] = await connection.execute(sql1);
  const [removed] = await connection.execute(sql);

  if (!removed.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return result;
  }
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
