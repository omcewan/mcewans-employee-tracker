const initialQuestion = [
  {
    type: "list",
    name: "company",
    message: "What would you like to do?!",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add An Employee",
      "Update Employee's Manager",
      "Update Employee's Role",
      "Delete An Employee",
      "View All Departments",
      "Add A Department",
      "Delete A Department",
      "View All Roles",
      "Add A Role",
      "Delete A Role",
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

const addEmployeeQuestions = [
  {
    type: "input",
    name: "first",
    message: "Please enter the first name for the employee would like to add!",
    validate: (first) => {
      if (first) {
        return true;
      } else {
        console.log("Please enter a first name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "last",
    message:
      "Please enter the last name for the employee you would like to add!",
    validate: (last) => {
      if (last) {
        return true;
      } else {
        console.log("Please enter a last name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "role",
    message:
      "Please enter the id for the role you would like to add to this employee! Use above tables as references.",
    validate: (role) => {
      if (role == +role) {
        return true;
      } else {
        console.log("Please enter a role id!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "manager",
    message:
      "Please enter the manager id you would like to add to this employee! Use above tables as references!",
    validate: (manager) => {
      if (manager == +manager) {
        return true;
      } else {
        console.log("Please enter a manager id!");
        return false;
      }
    },
  },
];

const updateRoleQuestions = [
  {
    type: "input",
    name: "employee",
    message: "Please enter the ID for the employee you would like to update!",
    validate: (employee) => {
      if (employee == +employee) {
        return true;
      } else {
        console.log("Please enter a valid ID!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "role",
    message:
      "Please enter the ID for the role you would like to add to this employee!",
    validate: (role) => {
      if (role == +role) {
        return true;
      } else {
        console.log("Please enter a role id!");
        return false;
      }
    },
  },
];

const updateManagerQuestions = [
  {
    type: "input",
    name: "employee",
    message: "Please enter the ID for the employee you would like to update!",
    validate: (employee) => {
      if (employee == +employee) {
        return true;
      } else {
        console.log("Please enter a valid ID number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "manager",
    message:
      "Please enter the ID for the manager you would like to assign the employee to! Use the above table as a refeence for current managers.",
    validate: (manager) => {
      if (manager == +manager) {
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
    message: "Please enter the ID for the employee you would like to delete! Use the above table as a reference",
    validate: (employee) => {
      if (employee == +employee) {
        return true;
      } else {
        console.log("Please enter a valid ID!");
        return false;
      }
    },
  },
];

const deleteDepartmentQuestion = [
  {
    type: "input",
    name: "department",
    message: "Please enter the ID for the department you would like to delete!",
    validate: (department) => {
      if (department) {
        return true;
      } else {
        console.log("Please enter a valid ID!");
        return false;
      }
    },
  },
];

const deleteRoleQuestion = [
  {
    type: "input",
    name: "role",
    message: "Please enter the ID for the role you would like to delete!",
    validate: (role) => {
      if (role) {
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
  updateManagerQuestions,
  addRoleQuestions,
  addEmployeeQuestions,
  updateRoleQuestions,
  deleteEmployeeQuestion,
  deleteDepartmentQuestion,
  deleteRoleQuestion,
};
