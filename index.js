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
        .then((allEmployees) => console.log(allEmployees))
        .then(() => promptUser());
    }

    if (company === "View All Employees By Manager") {
      return employeesByManager()
        .then((employeesByManager) => console.log(employeesByManager))
        .then(() => promptUser());
    }

    if (company === "View All Employees By Department") {
      return employeesByDepartment()
        .then((employeesByDepartment) => console.log(employeesByDepartment))
        .then(() => promptUser());
    }

    if (company === "Add An Employee") {
      return reference()
        .then((referenceTable) => {
          console.log(referenceTable[0]);
          console.log(referenceTable[1]);
        })
        .then(() => inquirer.prompt(addEmployeeQuestions))
        .then(({ first, last, role, manager }) =>
          addEmployee(first, last, role, manager)
        )
        .then((newEmployee) =>
          console.log(
            `\n${newEmployee[0].first_name} ${newEmployee[0].last_name} was added to the database as a(n) ${newEmployee[0].title} under ${newEmployee[0].manager}!\n`
          )
        )
        .then(() => promptUser())
        .catch((err) => {
          console.log(`\nThe Manager ID or Role entered does not exist!\n`);
          return promptUser();
        });
    }

    if (company === "Update Employee's Manager") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[0]))
        .then(() => inquirer.prompt(updateManagerQuestions))
        .then(({ employee, manager }) =>
          updateEmployeeManager(employee, manager)
        )
        .then((newManager) => {
          if (newManager) {
            console.log(
              `\n${newManager[0].first_name} ${newManager[0].last_name}'s manager was changed to ${newManager[0].manager}!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => promptUser())
        .catch((err) => {
          console.log("\nThe Manager ID entered does not exist!\n");
          // console.error(err.sqlMessage);
          return promptUser();
        });
    }

    if (company === "Update Employee's Role") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[1]))
        .then(() => inquirer.prompt(updateRoleQuestions))
        .then(({ employee, role }) => updateEmployeeRole(employee, role))
        .then((updatedRole) => {
          if (updatedRole) {
            console.log(
              `\n${updatedRole[0].first_name} ${updatedRole[0].last_name} role was changed to ${updatedRole[0].title}!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => promptUser())
        .catch((err) => {
          console.log("\nThe Role chosen does not exist!");
          // console.error(err.sqlMessage);
          return promptUser();
        });
    }

    if (company === "Delete An Employee") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[2]))
        .then(() => inquirer.prompt(deleteEmployeeQuestion))
        .then(({ employee }) => deleteEmployee(employee))
        .then((removedEmployee) => {
          if (removedEmployee) {
            console.log(
              `\n${removedEmployee[0].first_name} ${removedEmployee[0].last_name} was removed from the database!\n`
            );
          } else {
            console.log("\nEmployee ID Does Not Exist!\n");
          }
        })
        .then(() => promptUser());
    }

    if (company === "View All Departments") {
      return getDepartments()
        .then((allDepartments) => console.log(allDepartments))
        .then(() => promptUser());
    }

    if (company === "Add A Department") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[3]))
        .then(() => inquirer.prompt(addDepartmentQuestion))
        .then(({ department }) => addDepartment(department))
        .then((newDepartment) =>
          console.log(
            `\n${newDepartment[0].Department} was added to the database as a new Department!\n`
          )
        )
        .then(() => promptUser())
        .catch((err) => {
          console.log("\nThis Department already exists!\n");
          // console.error(err.sqlMessage);
          return promptUser();
        });
    }

    if (company === "Delete A Department") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[3]))
        .then(() => inquirer.prompt(deleteDepartmentQuestion))
        .then(({ department }) => deleteDepartment(department))
        .then((removedDepartment) =>
          console.log(
            `\n${removedDepartment[0].Department} was removed from the database!\n`
          )
        )
        .then(() => promptUser())
        .catch((err) => {
          console.log("\nThis Department Does Not Exist!\n");
          return promptUser();
        });
    }

    if (company === "View All Roles") {
      return getRoles()
        .then((allRoles) => console.log(allRoles))
        .then(() => promptUser());
    }

    if (company === "Add A Role") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[4]))
        .then(() => inquirer.prompt(addRoleQuestions))
        .then(({ role, departmentId, salary }) =>
          addRole(role, departmentId, salary)
        )
        .then((newRole) =>
          console.log(
            `\n${newRole[0].title} was added to the database as a new role!\n`
          )
        )
        .then(() => promptUser())
        .catch((err) => {
          console.log("\nDepartment does not exisit!\n");
          return promptUser();
        });
    }

    if (company === "Delete A Role") {
      return reference()
        .then((referenceTable) => console.log(referenceTable[4]))
        .then(() => inquirer.prompt(deleteRoleQuestion))
        .then(({ role }) => deleteRole(role))
        .then((deletedRole) => {
          console.log(
            `\n${deletedRole[0].title} was removed from the database!\n`
          );
        })
        .then(() => promptUser())
        .catch((err) => {
          console.log(`\nRole does not exist!\n`);
          return promptUser();
        });
    }
    if (company === "Quit") {
      console.log("GoodBye");
    }
  });
};

promptUser();
