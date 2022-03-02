const mysql = require("mysql2/promise");
const cTable = require("console.table");

async function getRoles() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = `SELECT roles.id AS "Role ID", roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`;

  const [results] = await connection.execute(sql);
  const tableAllRoles = cTable.getTable(
    "\n\nCurrently Viewing All Roles",
    results
  );
  connection.end();
  return tableAllRoles;
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
    `SELECT roles.title FROM roles WHERE roles.title = '${role}'`,
  ];

  // TODO: fix error with duplicates
  const [result] = await connection.execute(sql[0]);
  const [result1] = await connection.execute(sql[1]);
  if (!result.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return result1;
  }
}

async function deleteRole(role) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `DELETE FROM roles WHERE id = ${role}`,
    `SELECT roles.title FROM roles WHERE roles.id = ${role}`,
  ];

  const [result] = await connection.execute(sql[1]);
  const [results] = await connection.execute(sql[0]);

  if (!results.affectedRows) {
    connection.end();
    return;
  } else {
    connection.end();
    return result;
  }
}

module.exports = { getRoles, addRole, deleteRole };
