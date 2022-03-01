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
  const allDepartments = cTable.getTable(
    "\n\nCurrently Viewing All Departments",
    results
  );
  connection.end();
  return allDepartments
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
    `SELECT departments.department_name AS department FROM departments WHERE departments.department_name = '${department}'`,
  ];

  // TODO: fix error with duplicates
  const [inserted] = await connection.query(sql[0]);

  const [newDepartment] = await connection.execute(sql[1]);

  if (!inserted.affectedRows) {
    connection.end()
    return
  } else {
    connection.end()
    return newDepartment;
  }
}

async function deleteDepartment(department) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mountain_DECANT2whitish",
    database: "my_company",
  });

  const sql = [
    `DELETE FROM departments
  WHERE id = ${department} `,
    `SELECT departments.id, departments.department_name AS department FROM departments`,
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

module.exports = { getDepartments, addDepartment, deleteDepartment };
