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
- **Server**: Spring Boot Embedded Server (no external server required)

## Prerequisites

Before running this project, ensure you have the following installed:

- **Java 17** or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))

Verify installations:
```bash
java -version
mvn -version
```

## How to Run the Project Using Maven

### Step 1: Clone the Repository

```bash
git clone https://github.com/vivek-vk7/Student-Management-System.git
cd Student-Management-System
```

### Step 2: Build the Project

Build the project using Maven to create the executable JAR file:

```bash
mvn clean package
```

**What this does:**
- Compiles all Java source code
- Runs tests (if any)
- Packages the application into an executable JAR file at `target/student-management-1.0.0.jar`

### Step 3: Run the Application

You have two options to run the application using Maven:

#### Option A: Run using Maven Spring Boot Plugin (Recommended for Development)

```bash
mvn spring-boot:run
```

This command:
- Compiles the project if needed
- Starts the Spring Boot embedded server
- Runs the application directly without creating a JAR file

#### Option B: Run using the Executable JAR File (Recommended for Production)

First, build the project (if not already done):
```bash
mvn clean package
```

Then run the JAR file:
```bash
java -jar target/student-management-1.0.0.jar
```

**Note:** If you haven't built the project yet, you must run `mvn clean package` first before using Option B.

### Step 4: Access the Application

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

## Maven Commands Reference

### Build Commands

```bash
# Clean and compile
mvn clean compile

# Clean, compile, test, and package
mvn clean package

# Skip tests during build
mvn clean package -DskipTests
```

### Run Commands

```bash
# Run using Maven Spring Boot plugin
mvn spring-boot:run

# Run using JAR file (after building)
java -jar target/student-management-1.0.0.jar
```

### Other Useful Commands

```bash
# View dependency tree
mvn dependency:tree

# Clean build artifacts
mvn clean
```

## REST API Endpoints

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
  ...
}
```

#### Delete Student
```http
DELETE /api/students/{id}
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

### Application Won't Start

- Check if Java 17+ is installed: `java -version`
- Verify Maven is working: `mvn -version`
- Check if port 8080 is available
- Review the console output for error messages

## License

This project is open source and available under the MIT License.

## Author

**Vivek**

- GitHub: [@vivek-vk7](https://github.com/vivek-vk7)

---

**Happy Coding! 🚀**
