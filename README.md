# Student Management System

A full-stack Java web application for managing student information, built with Spring Boot, Maven, and H2 database.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete student records
- 🎨 **Modern UI**: Attractive, responsive frontend with dark/light theme toggle
- 🔍 **Search & Filter**: Search by name, email, phone, and filter by major and enrollment year
- 📊 **Statistics Dashboard**: View total students, average GPA, unique majors, and earliest enrollment year
- 🎯 **Sorting**: Sort students by name, GPA, or enrollment year
- 💾 **H2 Database**: Embedded database with console access for data management
- 🚀 **REST API**: Full RESTful API endpoints for programmatic access

## Tech Stack

- **Backend**: Spring Boot 3.3.2, Java 17
- **Frontend**: Thymeleaf, HTML5, CSS3, JavaScript
- **Database**: H2 Database (embedded)
- **Build Tool**: Maven
- **Server**: Spring Boot Embedded Server (no external Tomcat or Docker required)
- **Validation**: Bean Validation

**Note**: This project uses only Maven, Java, and Spring Boot. No Docker or standalone Tomcat installation is required. Spring Boot includes an embedded server that runs automatically.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Java 17** or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))

Verify installations:
```bash
java -version
mvn -version
```

## Project Structure

```
Student Management System/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/studentmanagement/
│   │   │       ├── StudentManagementApplication.java
│   │   │       ├── controller/
│   │   │       │   └── StudentController.java
│   │   │       ├── model/
│   │   │       │   └── Student.java
│   │   │       ├── repository/
│   │   │       │   └── StudentRepository.java
│   │   │       └── service/
│   │   │           └── StudentService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── data.sql
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── styles.css
│   │       │   └── js/
│   │       │       └── app.js
│   │       └── templates/
│   │           └── students.html
├── pom.xml
└── README.md
```

## Quick Start Guide

### Prerequisites Check

Make sure you have Java 17+ and Maven 3.6+ installed:

```bash
java -version
mvn -version
```

### How to Run the Project

#### Step 1: Clone the Repository

```bash
git clone https://github.com/vivek-vk7/Student-Management-System.git
cd Student-Management-System
```

#### Step 2: Build the Project

Build the project using Maven to create the executable JAR file:

```bash
mvn clean package
```

**What this does:**
- Compiles all Java source code
- Runs tests (if any)
- Packages the application into an executable JAR file at `target/student-management-1.0.0.jar`

#### Step 3: Run the Application

You have two options to run the application:

**Option A: Run using Maven (Recommended for Development)**
```bash
mvn spring-boot:run
```

**Option B: Run using the JAR file (Recommended for Production)**
```bash
java -jar target/student-management-1.0.0.jar
```

**Note:** If you haven't built the project yet, you must run `mvn clean package` first before using Option B.

#### Step 4: Access the Application

Once the application starts successfully, you will see a message like:
```
Started StudentManagementApplication in X.XXX seconds
```

Now you can access the application at:

- 🌐 **Web Interface**: http://localhost:8080/students
- 🔌 **REST API**: http://localhost:8080/api/students
- 💾 **H2 Database Console**: http://localhost:8080/h2-console

#### H2 Console Access

To access the H2 database console, use these credentials:
- **JDBC URL**: `jdbc:h2:file:./data/studentdb`
- **Username**: `sa`
- **Password**: (leave empty)

---

## Getting Started (Detailed)

#### H2 Console Credentials

When accessing the H2 console, use these connection details:
- **JDBC URL**: `jdbc:h2:file:./data/studentdb`
- **Username**: `sa`
- **Password**: (leave empty)

## Usage

### Web Interface

1. **View Students**: The main page displays all students in a table format
2. **Add Student**: Click the "Add Student" button to open a modal form
3. **Edit Student**: Click the "Edit" button on any student row
4. **Delete Student**: Click the "Delete" button and confirm the action
5. **Search**: Use the search bar to filter students by name, email, or phone
6. **Filter**: Use the dropdown filters to filter by major or enrollment year
7. **Sort**: Select a sorting option from the sort dropdown
8. **Theme Toggle**: Click the theme toggle button to switch between light and dark modes

### REST API Endpoints

#### Get All Students
```http
GET /api/students
```

#### Get Student by ID
```http
GET /api/students/{id}
```

#### Create Student
```http
POST /api/students
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "dateOfBirth": "2000-01-15",
  "address": "123 Main St",
  "major": "Computer Science",
  "gpa": 3.8,
  "enrollmentYear": 2020
}
```

#### Update Student
```http
PUT /api/students/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  ...
}
```

#### Delete Student
```http
DELETE /api/students/{id}
```

## Student Model

The Student entity includes the following fields:

- `id` (Long) - Auto-generated unique identifier
- `firstName` (String) - Student's first name (required)
- `lastName` (String) - Student's last name (required)
- `email` (String) - Email address (required, unique)
- `phone` (String) - Phone number (optional)
- `dateOfBirth` (LocalDate) - Date of birth (optional)
- `address` (String) - Address (optional)
- `major` (String) - Academic major (optional)
- `gpa` (Double) - Grade Point Average, range 0-4 (optional)
- `enrollmentYear` (Integer) - Year of enrollment (optional)

## Database

The application uses H2 database in file mode. The database file is stored at:
```
./data/studentdb.mv.db
```

The database schema is automatically created on first run, and sample data is loaded from `src/main/resources/data.sql`.

## Building and Packaging

### Create Executable JAR

```bash
mvn clean package
```

The JAR file will be created at: `target/student-management-1.0.0.jar`

### Skip Tests (if needed)

```bash
mvn clean package -DskipTests
```

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, you can change it by editing `src/main/resources/application.properties`:

```properties
server.port=8081
```

### Database Issues

If you encounter database issues:
1. Stop the application
2. Delete the `data` folder
3. Restart the application (database will be recreated)

### Maven Build Issues

If Maven build fails:
- Ensure Java 17+ is installed and `JAVA_HOME` is set correctly
- Clear Maven cache: `mvn clean`
- Update Maven dependencies: `mvn dependency:resolve`

## Development

### Running in Development Mode

For hot-reload during development, you can use:

```bash
mvn spring-boot:run
```

Spring Boot DevTools (if added) will automatically reload changes.

### Project Configuration

Main configuration file: `src/main/resources/application.properties`

Key settings:
- Database connection settings
- JPA/Hibernate configuration
- Server port
- H2 console access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**Vivek**

- GitHub: [@vivek-vk7](https://github.com/vivek-vk7)

## Acknowledgments

- Spring Boot team for the excellent framework
- H2 Database for the embedded database solution
- All contributors and users of this project

---

**Happy Coding! 🚀**
