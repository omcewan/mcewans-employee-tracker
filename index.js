const inquirer = require("inquirer");
const getEmployees = require("./utils/employees")
const getRoles = require("./utils/roles")
const getDepartments = require("./utils/departments")

const initialQuestion = [
  {
    type: "list",
    name: "company",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];


inquirer.prompt(initialQuestion).then(({ company }) => {
  if (company === "View All Employees") {
    getEmployees();
  }
  if (company === "View All Roles") {
    getRoles();
  }
  if (company === "View All Departments") {
    getDepartments();
  }
  if (company === "Quit") {
    console.log("GoodBye");
  }
});
