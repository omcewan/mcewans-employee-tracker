const inquirer = require("inquirer");
const {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployee,
} = require("./utils/employees");
const getRoles = require("./utils/roles");
const getDepartments = require("./utils/departments");
const { up } = require("inquirer/lib/utils/readline");

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

const updateEmployeeQuestion = [
  {
    type: "input",
    name: "employee",
    message: "Please enter the ID for the employee you would like to update!",
    validate: (employee) => {
      if (employee) {
        return true;
      } else {
        console.log("Please enter an ID");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "manager",
    message:
      "Please enter the ID for the manager you would like to assign the employee to!",
    validate: (manager) => {
      if (manager) {
        return true;
      } else {
        console.log("Please enter a value!");
        return false;
      }
    },
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
    if (company === "Update Employee's Manager") {
      inquirer.prompt(updateEmployeeQuestion).then(({ employee, manager }) => {
        updateEmployee(employee, manager);
      });
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
