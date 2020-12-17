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
        "Remove Role",
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
        case "View all Roles":
          showRole();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Delete Employee":
          deleteEmp();
          break;
        case "Add Role":
          addRole();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
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

const showRole = () => {
  connection.query("Select * From Role", (err, res) => {
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
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter new title.",
      },
      {
        name: "Salary",
        type: "input",
        message: "Enter new Salary.",
      },
      {
        name: "dep_id",
        type: "input",
        message: "Enter new Department.",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO role SET ?", res, function (err, res) {
        if (err) throw err;
        console.log("New role added");
        startApp();
      });
    });
};

const removeRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Which Role would you like to remove?",
      },
    ])
    .then((res) => {
      connection.query("DELETE FROM role WHERE ?", res, function (err, res) {
        if (err) throw err;
        console.log("Role Removed");
        startApp();
      });
    });
};

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Which employee would you like to update?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's new role?",
      },
    ])
    .then((res) => {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{ role_id: res.role_id }, { id: res.id }],
        function (err, res) {
          if (err) throw err;
          startApp();
        }
      );
    });
}
