INSERT INTO departments
  (name)
VALUES
  ('Marketing'),
  ('Finance'),
  ('Operations Management'),
  ('Human Resources'),
  ('IT');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Marketing Associate', '50000', '1'),
  ('Finance Associate', '50000', '2'),
  ('Operations Associate', '50000', '3'),
  ('Human Resources Associate', '50000', '4'),
  ('IT Associate', '50000', '5'),
  ('Marketing Manager', '100000', '1'),
  ('Finance Manager', '100000', '2'),
  ('Operations Manager', '100000', '3'),
  ('Human Resources Manager', '100000', '4'),
  ('IT Manager', '100000', '5'),
  ('Marketing Director', '150000', '1'),
  ('Finance Director', '150000', '2'),
  ('Operations Director', '150000', '3'),
  ('Human Resources Director', '150000', '4'),
  ('IT Director', '150000', '5');

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 6),
  ('Virginia', 'Woolf', 2, 7),
  ('Piers', 'Gaveston', 3, 8),
  ('Charles', 'LeRoi', 4, 9),
  ('Katherine', 'Mansfield', 5, 10),
  ('Dora', 'Carrington', 6, NULL),
  ('Edward', 'Bellamy', 7, NULL),
  ('Montague', 'Summers', 8, NULL),
  ('Octavia', 'Butler', 9, NULL),
  ('Unica', 'Zurn', 10, NULL);