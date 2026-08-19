# Student Enrollment Form using JsonPowerDB

## Description

The **Student Enrollment Form** is a micro project for storing and managing student enrollment information using **JsonPowerDB (JPDB)** as the backend database.

The form contains the following fields:

- Roll No. — Primary Key
- Full Name
- Class
- Birth Date
- Address
- Enrollment Date

When the page loads, the form is reset and the cursor is placed in the **Roll No.** field. The remaining input fields and control buttons are initially disabled.

After the user enters a Roll No.:

- If the Roll No. does not exist in the database, the remaining fields are enabled along with **Save** and **Reset**.
- If the Roll No. already exists, the existing student details are displayed. The primary-key field is disabled and **Update** and **Reset** are enabled.
- Empty fields are not accepted.
- After Save, Update, or Reset, the form returns to its initial state.

## Table of Contents

1. [Description](#description)
2. [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
3. [Scope of Functionalities](#scope-of-functionalities)
4. [Examples of Use](#examples-of-use)
5. [Illustrations](#illustrations)
6. [Project Status](#project-status)
7. [Release History](#release-history)
8. [Sources](#sources)
9. [Other Information](#other-information)

## Benefits of using JsonPowerDB

JsonPowerDB is a developer-friendly database server that provides REST API services. It is designed to be lightweight, high-performance, real-time, simple to use, and suitable for serverless development.

Benefits relevant to this project include:

- **REST API based:** The frontend can communicate with the database through HTTP/REST APIs.
- **Serverless development support:** Simple dynamic applications can be developed without building a traditional server-side database layer.
- **JSON based:** Student information can be represented naturally as JSON objects.
- **Schema flexibility:** JsonPowerDB supports flexible data structures, making development and maintenance easier.
- **Fast CRUD operations:** JPDB is designed for high-performance Create, Read, Update, and Delete operations.
- **Easy integration:** It can be used with technologies that support HTTP requests.
- **Real-time database capabilities:** It is designed for applications that require quick access to current data.
- **Multiple database modes:** JPDB supports document, key-value, and relational-style database functionality.
- **Developer-friendly APIs:** Commands are available for inserting, retrieving, updating, and deleting JSON data.
- **Reduced development complexity:** For a small HTML/JavaScript project, JPDB can reduce the amount of backend setup required.

## Scope of Functionalities

The project supports:

- Student enrollment data entry.
- Roll No. as the primary key.
- Primary-key lookup before allowing data entry.
- Automatic detection of new and existing student records.
- Retrieval of an existing student record.
- Insertion of a new student record.
- Updating an existing student record.
- Form reset functionality.
- Required-field validation.
- Automatic cursor focus management.
- Enabling and disabling fields/buttons according to the record state.

### Form Fields

| Field | Description |
|---|---|
| Roll No. | Unique student identifier and primary key |
| Full Name | Student's full name |
| Class | Student's class/course |
| Birth Date | Student's date of birth |
| Address | Student's address |
| Enrollment Date | Date of enrollment |

### Control Buttons

| Button | Function |
|---|---|
| Save | Stores a new student record |
| Update | Updates an existing student record |
| Reset | Clears the form and restores its initial state |

## Examples of Use

### Adding a New Student

1. Open the Student Enrollment Form.
2. Enter a Roll No.
3. The application checks whether the Roll No. already exists.
4. If it does not exist, the remaining fields become available.
5. Enter the student's details.
6. Click **Save**.
7. The student record is stored in JsonPowerDB.
8. The form returns to its initial state.

### Updating an Existing Student

1. Enter an existing Roll No.
2. The application retrieves the student information from JsonPowerDB.
3. Existing details are displayed automatically.
4. Roll No. becomes disabled because it is the primary key.
5. Modify the required fields.
6. Click **Update**.
7. The database record is updated.
8. The form resets.

## Illustrations

Recommended screenshots to add before submitting the project:

- Initial Student Enrollment Form.
- New Roll No. entered with Save button enabled.
- Existing Roll No. with student information displayed.
- JsonPowerDB dashboard showing the database/relation.
- Stored student record in JsonPowerDB.

Screenshots can be placed in an `images` directory and included in this README, for example:

```markdown
![Student Enrollment Form](images/student-form.png)
```

## Project Status

**Status:** Functional micro-project / learning project.

The project demonstrates database CRUD operations and form-state management. Further improvements can include delete functionality, advanced validation, search, student listing, authentication, and improved responsive UI.

## Release History

### v1.0.0

**Initial Release**

- Created Student Enrollment Form.
- Added Roll No. primary-key handling.
- Added JsonPowerDB integration.
- Added record lookup functionality.
- Added Save functionality for new student records.
- Added Update functionality for existing records.
- Added Reset functionality.
- Added required-field validation.
- Added automatic form field/button state management.

### GitHub Release

After pushing the project to GitHub, create a release/tag such as:

`v1.0.0 - Student Enrollment Form using JsonPowerDB`

Then replace the placeholder below with your actual repository/release information:

- Repository: `YOUR_GITHUB_REPOSITORY`
- Release: `YOUR_GITHUB_RELEASE_LINK`

## Sources

- Login2Xplore / JsonPowerDB official website
- JsonPowerDB documentation
- JsonPowerDB tutorials and examples
- JsonPowerDB REST API command reference

Official documentation can be used to learn about connection tokens, REST APIs, PUT/UPDATE operations, and retrieving JSON records.

## Other Information

### Technologies

- HTML
- CSS
- JavaScript
- JsonPowerDB
- REST API
- JSON

### Database Information

- **Database Name:** SCHOOL-DB
- **Relation Name:** STUDENT-TABLE
- **Primary Key:** Roll-No

### Future Enhancements

- Add Delete functionality.
- Add student search and listing.
- Add stronger date and field validation.
- Add confirmation messages.
- Add authentication.
- Improve responsive design.
- Add loading/error indicators for database requests.

## Author

**Mani Balesh Madderla**

Micro Project — Student Enrollment Form using JsonPowerDB.
