const mysql = require("mysql2/promise");
const cTable = require("console.table");

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

async function addRole(role, departmentid, salary) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `INSERT INTO roles (title, department_id, salary)
  VALUES ('${role}', ${departmentid}, ${salary})`,
    `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`,
  ];

  // TODO: fix error with duplicates
  const [result] = await connection.query(sql[0]);
  if (!result.affectedRows) {
    console.log({ message: "Department already exists!" });
  }

  const [results] = await connection.execute(sql[1]);
  const allDepartments = cTable.getTable(results);
  console.log(allDepartments);
  connection.end();
}

async function deleteRole(role) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `DELETE FROM roles
  WHERE id = ${role} `,
    `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`,
  ];

  const [results] = await connection.execute(sql[0]);

  if (!results.affectedRows) {
    console.log({ message: "Employee ID Does Not Exist!" });
  } else {
    const [results] = await connection.execute(sql[1]);
    const allDepartments = cTable.getTable(results);
    console.log(allDepartments);
  }
  connection.end();
}

module.exports = { getRoles, addRole, deleteRole };
