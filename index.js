const inquirer = require("inquirer");
const {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployee,
  deleteEmployee,
} = require("./utils/employees");
const getRoles = require("./utils/roles");
const {getDepartments, addDepartment} = require("./utils/departments");

const initialQuestion = [
  {
    type: "list",
    name: "company",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "View Employees By Department",
      "View Employees By Manager",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update Employee's Role",
      "Update Employee's Manager",
      "Add Role",
      "Add Department",
      "Quit",
    ],
  },
];

const addDepartmentQuestion = [
  {
    type: "input",
    name: "department",
    message: "Please Enter the name of a Department you would like to add!",
    validate: (department) =>  {
      if (department) {
        return true;
      } else {
        console.log("Please enter a Department name!");
        return false;
      }
    }
  }
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
        console.log("Please enter a valid ID!");
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
        console.log("Please enter a valid ID!");
        return false;
      }
    },
  },
];

const deleteEmployeeQuestion = [
  {
    type: "input",
    name: "employee",
    message: "Please enter the ID for the employee you would like to delete!",
    validate: (employee) => {
      if (employee) {
        return true;
      } else {
        console.log("Please enter a valid ID!");
        return false;
      }
    }
  }
]

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
    if (company === "Add A Department") {
      inquirer.prompt(addDepartmentQuestion).then(({department}) => {
        addDepartment(department);
      });
    }
    if (company === "Quit") {
      console.log("GoodBye");
    }
  });
};

promptUser();
