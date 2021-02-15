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
        "Add Department",
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
        case "Remove Employee":
          deleteEmp();
          break;
        case "Add Role":
          addRole();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Add Department":
          addDepartment();
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
        name: "role_id",
        type: "input",
        message: "What is the employee's role?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's Id?",
      },
    ])
    .then((res) => {
      connection.query(
        "Insert into employee (first_name, last_name, role_id, manager_id)  values(?,?,?,?)",
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        function (err, results) {
          console.log("New employee added");
          startApp();
        }
      );
    });
};

const deleteEmp = () => {
  connection.query("Select * From employee", (err, res) => {
    if (err) throw err;

    const employeeList = res.map((employee) => {
      return `${employee.first_name} ${employee.last_name}`;
    });

    inquirer
      .prompt([
        {
          name: "deleteEmp",
          type: "rawlist",
          message: "Which Employee would you like to remove?",
          choices: employeeList,
        },
      ])
      .then((res) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          [{ id: res.deleteEmp.id }],
          function (err, res) {
            if (err) throw err;
            console.log("Employee Removed");
            startApp();
          }
        );
      });
  });

  //get emp list here
  //pass id
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

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "dep_name",
        type: "input",
        message: "Enter new department.",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department SET ?",
        res,
        function (err, res) {
          if (err) throw err;
          console.log("New department added");
          startApp();
        }
      );
    });
};
