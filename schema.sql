CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  , department_name VARCHAR(30)NULL
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    id - INT PRIMARY KEY
  , title -  VARCHAR(30) to hold role title
  , salary -  DECIMAL to hold role salary
  , department_id -  INT to hold reference to department role belongs to
)

CREATE TABLE employee (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
  , first_name - VARCHAR(30) to hold employee first name
  , last_name - VARCHAR(30) to hold employee last name
  , role_id - INT to hold reference to role employee has
  , manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
);