const inquirer = require("inquirer");

const promptUser = () => {
  inquirer.prompt([
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
  ]);
};

promptUser();
