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
      "Quit",
    ],
  },
];

const addDepartmentQuestion = [
  {
    type: "input",
    name: "department",
    message: "Please enter the name of a Department you would like to add!",
    validate: (department) => {
      if (department) {
        return true;
      } else {
        console.log("Please enter a Department name!");
        return false;
      }
    },
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "role",
    message: "Please enter the role you would like to add!",
    validate: (role) => {
      if (role) {
        return true;
      } else {
        console.log("Please enter a Role!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "departmentId",
    message:
      "Please enter the department id  you would like to add this role to!",
    validate: (departmentId) => {
      if (departmentId) {
        return true;
      } else {
        console.log("Please enter a department id to associate this role to!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "salary",
    message: "Please enter the salary you would like to add to this role!",
    validate: (salary) => {
      if (salary) {
        return true;
      } else {
        console.log("Please enter a salary!");
        return false;
      }
    },
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
    },
  },
];

module.exports = {
  initialQuestion,
  addDepartmentQuestion,
  updateEmployeeQuestion,
  addRoleQuestions,
};
