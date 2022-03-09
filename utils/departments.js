const cTable = require("console.table");
const connection = require("../config/connection");

async function getDepartments() {
 const connect = await connection

  const sql = `SELECT departments.id AS "Department ID", departments.department_name AS Department FROM departments`;
  const [results] = await connect.execute(sql);
  const allDepartments = cTable.getTable(
    "\n\nCurrently Viewing All Departments",
    results
  );
  return allDepartments;
}

async function addDepartment(department) {
 const connect = await connection

  const sql = [
    `INSERT INTO departments (department_name)
  VALUES ('${department}')`,
    `SELECT departments.department_name AS Department FROM departments WHERE departments.department_name = '${department}'`,
  ];

  const [inserted] = await connect.query(sql[0]);

  const [newDepartment] = await connect.execute(sql[1]);

  if (!inserted.affectedRows) {
    return;
  } else {
    return newDepartment;
  }
}

async function deleteDepartment(department) {
 const connect = await connection

  const sql = [
    `DELETE FROM departments
  WHERE id = ${department} `,
    `SELECT departments.department_name AS Department FROM departments WHERE departments.id = ${department}`,
  ];

  const [result] = await connect.execute(sql[1]);
  const [results] = await connect.execute(sql[0]);

  if (!results.affectedRows) {
    return;
  } else {
    return result;
  }
}

module.exports = { getDepartments, addDepartment, deleteDepartment };
