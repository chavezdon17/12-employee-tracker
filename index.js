const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});
// Starting connection

function startApp() {
  inquirer
    .prompt({
      name: "startMenu",
      type: "list",
      message: "Select option",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employee",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.startMenu) {
        case "View all Employees":
          showEmployees();
          break;
        case "View all Departments":
          showDep();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Delete Employee":
          deleteEmp();
          break;
        case addRole():
          break;
      }
    });
}

const showEmployees = () => {
  connection.query("Select * From employee", (err, res) => {
    if (err) throw err;
    console.log("Please choose a choice");
    console.table(res);
    startApp();
  });
};

const showDep = () => {
  connection.query("Select * From Department", (err, res) => {
    if (err) throw err;
    console.log("Please choose a Department");
    console.table(res);
    startApp();
  });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "employee_title",
        type: "input",
        message: "What is the employee's role?",
      },
      {
        name: "employeeId",
        type: "input",
        message: "What is the employee's Id?",
      },
    ])
    .then((res) => {
      connection.query(
        "Insert into employee (first_name, last_name, employee_title, employeeId"
      );
      values("?,?,?,?"),
        [res.first_name, res.last_name, res.employee_title, employeeId],
        console.log("New employee added");
      startApp();
    });
};

const deleteEmp = () => {
  inquirer
    .prompt([
      {
        name: "deleteEmp",
        type: "input",
        message: "Which Employee would you like to remove?",
      },
    ])
    .then((res) => {
      connection.query(
        "DELETE FROM employee(?)",
        [res.showEmployees],
        function (err, res) {
          if (err) throw err;
          console.log("try again");
          console.log("Employee Removed");
          startApp();
        }
      );
    });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: "addRole",
      type: "input",
      message: "Enter new role.",
    },
    {
      name: "addSalary",
      type: "input",
      message: "Enter new Salary.",
    },
    {
      name: "addDepartment",
      type: "input",
      message: "Enter new Department.",
    }.then((res) => {
      connection.query(
        "Add Role FROM employee(?)",
        [res.showEmployees],
        function (err, res) {
          if (err) throw err;
          console.log("try again");
          console.log("New role added");
          startApp();
        }
      );
    }),
  ]);
};
