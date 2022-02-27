const mysql = require("mysql2/promise");
const cTable = require("console.table");

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

module.exports = getDepartments;
