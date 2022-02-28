const inquirer = require("inquirer");
const {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployeeManager,
  deleteEmployee,
  addEmployee,
  updateEmployeeRole,
} = require("./utils/employees");
const { getRoles, addRole } = require("./utils/roles");
const { getDepartments, addDepartment } = require("./utils/departments");
const {
  initialQuestion,
  addDepartmentQuestion,
  updateManagerQuestions,
  addRoleQuestions,
  addEmployeeQuestions,
  updateRoleQuestions,
} = require("./utils/questions");

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
      inquirer.prompt(updateManagerQuestions).then(({ employee, manager }) => {
        updateEmployeeManager(employee, manager);
      });
    }
    if (company === "View All Roles") {
      getRoles();
    }
    if (company === "View All Departments") {
      getDepartments();
    }
    if (company === "Add A Department") {
      inquirer.prompt(addDepartmentQuestion).then(({ department }) => {
        addDepartment(department);
      });
    }
    if (company === "Add A Role") {
      inquirer
        .prompt(addRoleQuestions)
        .then(({ role, departmentId, salary }) => {
          addRole(role, departmentId, salary);
        });
    }
    if (company === "Add An Employee") {
      inquirer
        .prompt(addEmployeeQuestions)
        .then(({ first, last, role, manager }) => {
          addEmployee(first, last, role, manager);
        });
    }
    if (company === "Update Employee's Role") {
      inquirer
        .prompt(updateRoleQuestions)
        .then(({ employee, role}) => {
          updateEmployeeRole(employee, role);
        });
    }
    if (company === "Quit") {
      console.log("GoodBye");
    }
  });
};

promptUser();
