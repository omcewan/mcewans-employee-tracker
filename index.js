const inquirer = require("inquirer");
const {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
} = require("./utils/employees");
const getRoles = require("./utils/roles");
const getDepartments = require("./utils/departments");

const initialQuestion = [
  {
    type: "list",
    name: "company",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View Employees By Manager",
      "View Employees By Department",
      "Update Employee's Manager",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const promptUser = () => {
  return inquirer.prompt(initialQuestion).then(({ company }) => {
    if (company === "View All Employees") {
      getEmployees();
    }
    if (company === "View Employees By Manager") {
      employeesByManager();
    }
    if (company === "View Employees By Department") {
      employeesByDepartment();
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
};

promptUser();
