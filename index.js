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
const { getRoles, addRole, deleteRole } = require("./utils/roles");
const {
  getDepartments,
  addDepartment,
  deleteDepartment,
} = require("./utils/departments");
const {
  initialQuestion,
  addDepartmentQuestion,
  updateManagerQuestions,
  addRoleQuestions,
  addEmployeeQuestions,
  updateRoleQuestions,
  deleteEmployeeQuestion,
  deleteDepartmentQuestion,
  deleteRoleQuestion,
} = require("./utils/questions");

const promptUser = () => {
  return inquirer.prompt(initialQuestion).then(({ company }) => {
    if (company === "View All Employees") {
      getEmployees().then(() => {
        promptUser();
      });
    }

    if (company === "View All Employees By Manager") {
      employeesByManager().then(() => {
        promptUser();
      });
    }

    if (company === "View All Employees By Department") {
      employeesByDepartment().then(() => {
        promptUser();
      });
    }

    if (company === "Add An Employee") {
      inquirer
        .prompt(addEmployeeQuestions)
        .then(({ first, last, role, manager }) => {
          addEmployee(first, last, role, manager);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Update Employee's Manager") {
      inquirer
        .prompt(updateManagerQuestions)
        .then(({ employee, manager }) => {
          updateEmployeeManager(employee, manager);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Update Employee's Role") {
      inquirer
        .prompt(updateRoleQuestions)
        .then(({ employee, role }) => {
          updateEmployeeRole(employee, role);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Delete An Employee") {
      inquirer
        .prompt(deleteEmployeeQuestion)
        .then(({ employee }) => {
          deleteEmployee(employee);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "View All Departments") {
      getDepartments().then(() => {
        promptUser();
      });
    }

    if (company === "Add A Department") {
      inquirer.prompt(addDepartmentQuestion).then(({ department }) => {
        addDepartment(department).then(() => {
          promptUser();
        });
      });
    }

    if (company === "Delete A Department") {
      inquirer
        .prompt(deleteDepartmentQuestion)
        .then(({ department }) => {
          deleteDepartment(department);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "View All Roles") {
      getRoles().then(() => {
        promptUser();
      });
    }

    if (company === "Add A Role") {
      inquirer
        .prompt(addRoleQuestions)
        .then(({ role, departmentId, salary }) => {
          addRole(role, departmentId, salary);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Delete A Role") {
      inquirer.prompt(deleteRoleQuestion).then(({ role }) => {
        deleteRole(role).then(() => {
          promptUser();
        });
      });
    }
    if (company === "Quit") {
      console.log("GoodBye");
    }
  });
};

promptUser();
