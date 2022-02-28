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
  const [results] = await connection.execute(sql);
  const allDepartments = cTable.getTable(results);
  console.log(allDepartments);
  connection.end();
}

async function addDepartment(department) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `INSERT INTO departments (department_name)
  VALUES ('${department}')`,
    `SELECT departments.id, departments.department_name AS department FROM departments`,
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

module.exports = { getDepartments, addDepartment };
