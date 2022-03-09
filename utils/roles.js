const cTable = require("console.table");
const connection = require("../config/connection");

async function getRoles() {
  const connect = await connection

  const sql = `SELECT roles.id AS "Role ID", roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary
  FROM roles
  LEFT JOIN departments
  ON roles.department_id = departments.id`;

  const [results] = await connect.execute(sql);
  const tableAllRoles = cTable.getTable(
    "\n\nCurrently Viewing All Roles",
    results
  );
  return tableAllRoles;
}

async function addRole(role, departmentid, salary) {
  const connect = await connection

  const sql = [
    `INSERT INTO roles (title, department_id, salary)
  VALUES ('${role}', ${departmentid}, ${salary})`,
    `SELECT roles.title FROM roles WHERE roles.title = '${role}'`,
  ];

  const [result] = await connect.execute(sql[0]);
  const [result1] = await connect.execute(sql[1]);
  if (!result.affectedRows) {
    return;
  } else {
    return result1;
  }
}

async function deleteRole(role) {
  const connect = await connection

  const sql = [
    `DELETE FROM roles WHERE id = ${role}`,
    `SELECT roles.title FROM roles WHERE roles.id = ${role}`,
  ];

  const [result] = await connect.execute(sql[1]);
  const [results] = await connect.execute(sql[0]);

  if (!results.affectedRows) {
    return;
  } else {
    return result;
  }
}

module.exports = { getRoles, addRole, deleteRole };
