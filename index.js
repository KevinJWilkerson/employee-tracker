const inquirer = require("inquirer");
const db = require("./db/connection");

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update an employee role",
          "Exit application",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.viewChoice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit application":
          console.log(`
          ================
          Until next time!
          ================
          `);
          break;
      }
    });
};

const viewDepartments = () => {
  const sql = `SELECT id AS ID, name AS Name FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      return err;
    }
    console.table(rows);
    promptUser();
  });
};

const viewRoles = () => {
  const sql = `
    SELECT roles.id AS ID,
    roles.title AS Title,
    roles.salary AS Salary,
    departments.name AS Department
    FROM roles
    LEFT JOIN departments on roles.department_id = departments.id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      return err;
    }
    console.table(rows);
    promptUser();
  });
};

const viewEmployees = () => {
  const sql = `
    SELECT employees.id AS ID, 
    employees.first_name AS 'First Name', 
    employees.last_name AS 'Last Name', 
    employees.manager_id AS 'Manager ID',
    departments.name AS Department, 
    roles.title AS Title, 
    roles.salary AS Salary
    FROM employees
    LEFT JOIN roles 
    ON employees.role_id = roles.id
    INNER JOIN departments
    ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      return err;
    }
    console.table(rows);
    promptUser();
  });
};

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "name",
        message: "Enter the name of the new department.",
      },
    ])
    .then(({ name }) => {
      const sql = `
        INSERT INTO departments (name)
        VALUES (
            '${name}')`;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(`${name} has been added as a new department.`);
        promptUser();
      });
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "title",
        message: "Enter the title of the new role.",
      },
      {
        type: "text",
        name: "department_id",
        message: "Enter the Department ID for this new role.",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the new role",
      },
    ])
    .then((answers) => {
      const sql = `
          INSERT INTO roles (title, department_id, salary)
          VALUES (
            '${answers.title}',
            '${answers.department_id}',
            '${answers.salary}')`;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(`${answers.title} has been added as a new role.`);
        promptUser();
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "first_name",
        message: "Enter the new employee's first name.",
      },
      {
        type: "text",
        name: "last_name",
        message: "Enter the new employee's last name.",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID for the new employee.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for the new employee.",
      },
    ])
    .then((answers) => {
      const sql = `
            INSERT INTO employees (first_name, last_name, manager_id, role_id)
            VALUES (
                '${answers.first_name}',
                '${answers.last_name}',
                '${answers.manager_id}',
                '${answers.role_id}')`;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(
          `${answers.first_name} ${answers.last_name} has been added as a new employee.`
        );
        promptUser();
      });
    });
};

const updateEmployeeRole = () => {
  return inquirer
    .prompt([
      {
        type: "text",
        name: "first_name",
        message: "Enter the employee's first name.",
      },
      {
        type: "text",
        name: "last_name",
        message: "Enter the employee's last name.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for the employee's new role.",
      },
    ])
    .then((answers) => {
      const sql = `
              UPDATE employees
              SET role_id = '${answers.role_id}'
              WHERE first_name = '${answers.first_name}'
              AND last_name = '${answers.last_name}'`;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(
          `${answers.first_name} ${answers.last_name}'s role ID has been updated to ${answers.role_id}.`
        );
        promptUser();
      });
    });
};

promptUser();
