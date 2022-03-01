const inquirer = require("inquirer");
const {
  getEmployees,
  employeesByManager,
  employeesByDepartment,
  updateEmployeeManager,
  deleteEmployee,
  addEmployee,
  updateEmployeeRole,
  reference,
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
      return getEmployees()
        .then((allEmployees) => {
          console.log(allEmployees);
        })
        .then(() => {
          return promptUser();
        });
    }

    if (company === "View All Employees By Manager") {
      return employeesByManager()
        .then((employeesByManager) => {
          console.log(employeesByManager);
        })
        .then(() => {
          return promptUser();
        });
    }

    if (company === "View All Employees By Department") {
      return employeesByDepartment()
        .then((employeesByDepartment) => {
          console.log(employeesByDepartment);
        })
        .then(() => {
          return promptUser();
        });
    }

    if (company === "Add An Employee") {
      return reference()
        .then((referenceTable) => {
          console.log(referenceTable[0]);
          console.log(referenceTable[1]);
        })
        .then(() => {
          return inquirer.prompt(addEmployeeQuestions);
        })
        .then(({ first, last, role, manager }) => {
          return addEmployee(first, last, role, manager);
        })
        .then((newEmployee) => {
          console.log(
            `\n${newEmployee[0].first_name} ${newEmployee[0].last_name} was added to the database as a(n) ${newEmployee[0].title} under ${newEmployee[0].manager}\n!`
          );
        })
        .then(() => {
          return promptUser();
        })
        .catch((err) => {
          console.log(`\nThe Manager ID or Role entered does not exist!\n`);
          return promptUser();
        });
    }

    if (company === "Update Employee's Manager") {
      return reference()
        .then((referenceTable) => {
          console.log(referenceTable[0]);
        })
        .then(() => {
          return inquirer.prompt(updateManagerQuestions);
        })
        .then(({ employee, manager }) => {
          return updateEmployeeManager(employee, manager);
        })
        .then((newManager) => {
          if (newManager) {
            console.log(
              `\n${newManager[0].first_name} ${newManager[0].last_name}'s manager was changed to ${newManager[0].manager}!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => {
          return promptUser();
        })
        .catch((err) => {
          console.log("\nThe Manager ID entered does not exist!\n");
          // console.error(err.sqlMessage);
          return promptUser();
        });
    }

    if (company === "Update Employee's Role") {
      return reference()
        .then((referenceTable) => {
          console.log(referenceTable[1]);
        })
        .then(() => {
          return inquirer.prompt(updateRoleQuestions);
        })
        .then(({ employee, role }) => {
          return updateEmployeeRole(employee, role);
        })
        .then((updatedRole) => {
          if (updatedRole) {
            console.log(
              `\n${updatedRole[0].first_name} ${updatedRole[0].last_name} role was changed to ${updatedRole[0].title}!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => {
          return promptUser();
        })
        .catch((err) => {
          console.log("\nThe Role chosen does not exist!");
          // console.error(err.sqlMessage);
          return promptUser();
        });
    }

    if (company === "Delete An Employee") {
      return reference()
        .then((referenceTable) => {
          console.log(referenceTable[2]);
        })
        .then(() => {
          return inquirer.prompt(deleteEmployeeQuestion);
        })
        .then(({ employee }) => {
          return deleteEmployee(employee);
        })
        .then((removedEmployee) => {
          if (removedEmployee) {
            console.log(
              `\n${removedEmployee[0].first_name} ${removedEmployee[0].last_name} was removed from the database!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => {
          return promptUser();
        });
    }

    if (company === "View All Departments") {
      getDepartments()
        .then((allDepartments) => {
          console.log(allDepartments);
        })
        .then(() => {
          promptUser();
        });
    }

    if (company === "Add A Department") {
      inquirer.prompt(addDepartmentQuestion).then(({ department }) => {
        return addDepartment(department)
          .then((newDepartment) => {
            if (newDepartment) {
              console.log(
                `${newDepartment[0].department} was added to the database as a new Department!`
              );
            } else {
              console.log("This department exists already!");
            }
          })
          .then(() => {
            promptUser();
          })
          .catch((err) => {
            console.error(err.sqlMessage);
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
