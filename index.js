const inquirer = require("inquirer");
const db = require("./db/connection");



db.connect(err => {
  if (err) throw err;
  console.log("Successfully Connected to Database!")
});

