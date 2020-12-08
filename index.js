const mysql = require("mysql");
const inquirer = require("inquirer");
const

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});
// Starting connection 

function startApp() {
  inquirer
    .prompt({
      name: "startMenu",
      type: "List",
      message: "Select option",
      choices:startingQuestions,
      const: startingQuestions ["View all Employees", "View all Departments", "View all Roles", "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Exit"]
    }).then((answer) => {
      switch (answer.startMenu){
        case "View all Employees":
          showEmployees();
          break;
          case "View all Departments":
            showDep();
            break
      }
    })
};

const showEmployees = () => {
  connection.query('Select * From employee', (err,res) => {
    if (err) throw err 
    console.log("Please choose a choice")
    table.printTable(res);
startApp();
  });
}

const showDep = () => {
  connection.query('Select * From Department', (err,res) => {
    if (err) throw err 
    console.log("Please choose a Department")
    table.printTable(res);
startApp();
  });
}

