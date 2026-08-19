CREATE DATABASE IF NOT EXISTS `SCHOOL-DB`;
USE `SCHOOL-DB`;

CREATE TABLE IF NOT EXISTS `STUDENT-TABLE` (
    `Roll-No` INT PRIMARY KEY,
    `Full-Name` VARCHAR(100) NOT NULL,
    `Class` VARCHAR(30) NOT NULL,
    `Birth-Date` DATE NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `Enrollment-Date` DATE NOT NULL
);

-- Optional sample record for testing:
-- INSERT INTO `STUDENT-TABLE`
-- (`Roll-No`, `Full-Name`, `Class`, `Birth-Date`, `Address`, `Enrollment-Date`)
-- VALUES (101, 'Rahul Kumar', 'B.Tech CSE', '2005-05-12', 'Hyderabad', '2026-08-18');
