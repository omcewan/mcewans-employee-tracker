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
      getEmployees()
        .then((allEmployees) => {
          console.log(allEmployees);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "View All Employees By Manager") {
      employeesByManager()
        .then((employeesByManager) => {
          console.log(employeesByManager);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "View All Employees By Department") {
      employeesByDepartment()
        .then((employeesByDepartment) => {
          console.log(employeesByDepartment);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Add An Employee") {
      inquirer
        .prompt(addEmployeeQuestions)
        .then(({ first, last, role, manager }) => {
          return addEmployee(first, last, role, manager);
        })
        .then((newEmployee) => {
          console.log(
            `${newEmployee[0].first_name} ${newEmployee[0].last_name} was added to the database as a(n) ${newEmployee[0].title} under ${newEmployee[0].manager}!`
          );
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Update Employee's Manager") {
      inquirer
        .prompt(updateManagerQuestions)
        .then(({ employee, manager }) => {
          return updateEmployeeManager(employee, manager);
        })
        .then((newManager) => {
          if (newManager) {
            console.log(
              `${newManager[0].first_name} ${newManager[0].last_name} manager was changed to ${newManager[0].manager}!`
            );
          } else {
            console.log("Employee ID Does Not Exist!");
          }
        })
        .then(() => {
          promptUser();
        })
        .catch(() => {
          console.log(
            `The Manager ID does not exist! Please Choose a valid ID!`
          );
          promptUser();
        })
    }

    if (company === "Update Employee's Role") {
      inquirer
        .prompt(updateRoleQuestions)
        .then(({ employee, role }) => {
          return updateEmployeeRole(employee, role);
        })
        .then((updatedRole) => {
          if (updatedRole) {
            console.log(
              `${updatedRole[0].first_name} ${updatedRole[0].last_name} role was changed to ${updatedRole[0].title}!`
            );
          } else {
            console.log("Employee ID Does Not Exist!");
          }
        })
        .then(() => {
          promptUser();
        })
        .catch(() => {
          console.log("The role does not exist")
          promptUser();
        })
    }

    if (company === "Delete An Employee") {
      inquirer
        .prompt(deleteEmployeeQuestion)
        .then(({ employee }) => {
          return deleteEmployee(employee);
        })
        .then((removedEmployee) => {
          if (removedEmployee) {
            console.log(
              `${removedEmployee[0].first_name} ${removedEmployee[0].last_name} was removed from the database!`
            );
          } else {
            console.log("Employee ID Does Not Exist!");
          }
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
