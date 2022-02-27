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
  connection.end()
}

module.exports = getRoles;