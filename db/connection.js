const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "my_company",
  },
  console.log("Connected to the my_company database.")
);

module.exports = db;