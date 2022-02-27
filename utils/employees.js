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

module.exports = getEmployees;