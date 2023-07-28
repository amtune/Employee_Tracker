INSERT INTO department (id, department_name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");

INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Sales Lead", 100000),
       (2, "Salesperson", 80000),
       (3, "Lead Engineer", 150000),
       (3, "Software Engineer", 120000),
       (4, "Accountant Manager", 160000),
       (4, "Accountant", 125000),
       (5, "Legal Team Lead", 250000),
       (5, "Lawyer", 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Allison", "Tune", 1, null),
       ("Tyler", "Brown", 2, 1),
       ("Michael", "Thompson", 3, 3),
       ("Cole", "Blue", 4, 1),
       ("Stephen", "Jenkins", 5, 4), 
       ("Aaron", "Banks", 6, 1),
       ("Amanda", "Plats", 7, 5),
       ("Brian", "Black", 8, 1),
       ("Samantha", "Collins", 9, 6);