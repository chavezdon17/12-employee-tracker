use employee_tracker_db;

insert into department (dep_name) Values('Engineer');
insert into department (dep_name) Values('Sales');
insert into department (dep_name) Values('Accounting');
insert into department (dep_name) Values('Legal');

insert into role (title, salary, dep_id) Values('Lead Engineer', 150000, 1);
insert into role (title, salary, dep_id) Values('Engineer', 80000, 2);
insert into role (title, salary, dep_id) Values('Lead Sales', 13000, 3);
insert into role (title, salary, dep_id) Values('Sales', 60000, 4);
insert into role (title, salary, dep_id) Values('Head Accounting', 200000, 5);
insert into role (title, salary, dep_id) Values('Accountant', 100000, 6);
insert into role (title, salary, dep_id) Values('Lead Legal', 300000, 7);
insert into role (title, salary, dep_id) Values('Lawyer', 120000, 8);

insert into employee (first_name, last_name, role_id, manager_id) Values('Micheal', "Scott" 1, 1);
insert into employee (first_name, last_name, role_id, manager_id) Values('Jim', "Halpert" 2, null);
insert into employee (first_name, last_name, role_id, manager_id) Values('Dwight', "Schrute" 3, null);

insert into employee (first_name, last_name, role_id, manager_id) Values('Andy', "Bernard" 4, 1);
insert into employee (first_name, last_name, role_id, manager_id) Values('Ryan', "Howard" 5, null);

insert into employee (first_name, last_name, role_id, manager_id) Values('Angela', "Martin" 6, 3);
insert into employee (first_name, last_name, role_id, manager_id) Values('Kevin', "Malone" 7, null);

insert into employee (first_name, last_name, role_id, manager_id) Values('Jan', "Levinson" 8, 4);
insert into employee (first_name, last_name, role_id, manager_id) Values('Toby', "Flenderson" 9, null);
