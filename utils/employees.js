const mysql = require("mysql2/promise");
const cTable = require("console.table");

async function reference() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });
  let references = [];

  const sql = [
    `SELECT CONCAT(first_name,' ',last_name) AS Manager, id AS "Manager ID" FROM employees WHERE manager_id IS NULL`,
    `SELECT roles.id AS "Role ID", roles.title AS Title, departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`,
    `SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name", roles.title AS Title,
    departments.department_name AS Department, roles.salary AS Salary, CONCAT (M.first_name,' ', M.last_name) AS Manager
    FROM employees E
    LEFT JOIN roles 
    ON E.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees M
    ON M.id = E.manager_id`,
    `SELECT departments.id AS "Department ID", departments.department_name AS Department FROM departments`,
    `SELECT roles.id AS "Role ID", roles.title AS Title, departments.id AS "Department ID", departments.department_name AS Department, roles.salary AS Salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`,
  ];

  const [manager] = await connection.execute(sql[0]);
  const referenceTable = cTable.getTable(
    "\nViewing Current Managers\n",
    manager
  );
  references.push(referenceTable);

  const [employee] = await connection.execute(sql[1]);
  const referenceTable1 = cTable.getTable(
    "\nViewing Roles & Department\n",
    employee
  );
  references.push(referenceTable1);

  const [results] = await connection.execute(sql[2]);
  const allEmployees = cTable.getTable(
    "\nCurrently Viewing All Employees\n",
    results
  );
  references.push(allEmployees);

  const [departments] = await connection.execute(sql[3]);
  const allDepartments = cTable.getTable(
    "\n\nViewing All Departments",
    departments
  );
  references.push(allDepartments);

  const [roles] = await connection.execute(sql[4]);
  const allRoles = cTable.getTable("\n\nViewing All Roles", roles);
  references.push(allRoles);

  connection.end();
  return references;
}

async function getEmployees() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name", roles.title AS Title,
  departments.department_name AS Department, roles.salary AS Salary, CONCAT (M.first_name,' ', M.last_name) AS Manager
  FROM employees E
  LEFT JOIN roles 
  ON E.role_id = roles.id
  LEFT JOIN departments
  ON roles.department_id = departments.id
  LEFT JOIN employees M
  ON M.id = E.manager_id`;

  const [results] = await connection.execute(sql);
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

  const sql = `SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name", roles.title AS Title,
  departments.department_name AS Department, roles.salary AS Salary,  CONCAT (M.first_name,' ', M.last_name) AS Manager
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

  const sql = `SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name", roles.title AS Title,
  departments.department_name AS Department, roles.salary AS Salary,  CONCAT (M.first_name,' ', M.last_name) AS Manager
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

  const sql = [
    `UPDATE employees
    SET manager_id = ${manager}
    WHERE id = ${employee}`,
    `SELECT e.first_name, e.last_name, CONCAT(m.first_name,' ',m.last_name) as manager FROM employees e
    left join employees m
    on m.id = e.manager_id
    where e.id = ${employee}`,
  ];

  // TODO: fix the error that shows up with an invalid manager id
  const [updated] = await connection.execute(sql[0]);

  const [newManager] = await connection.execute(sql[1]);

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

  const sql = [
    `UPDATE employees SET role_id = ${role} WHERE id = ${employee}`,
    `SELECT E.first_name, E.last_name, roles.title AS title FROM employees E LEFT JOIN roles ON E.role_id = roles.id WHERE E.id = ${employee}`,
  ];

  // TODO: fix the error that shows up with an invalid manager id
  const [update] = await connection.execute(sql[0]);

  const [newRole] = await connection.execute(sql[1]);

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

  const sql = [
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ('${first}', '${last}', ${role}, ${manager})`,
  ];

  const [result] = await connection.execute(sql[0]);

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

  const sql = [
    `DELETE FROM employees WHERE id = ${employee}`,
    `SELECT first_name, last_name FROM employees WHERE id = ${employee}`,
  ];

  const [removed] = await connection.execute(sql[1]);
  const [result] = await connection.execute(sql[0]);

  if (!result.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return removed;
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
  reference,
};
