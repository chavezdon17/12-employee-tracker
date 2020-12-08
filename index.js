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
      const: startingQuestions ["View all Employees", "View all departments", "View all Roles", "Add Employee", "Add Role", "Add Department", "Remove Employee", "Update Employee Role", "Exit"]
    })
}

// function to handle posting new items up for auction
function postAuction() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?",
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?",
      },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0,
        },
        function (err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}
