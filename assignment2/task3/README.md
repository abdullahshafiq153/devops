# Task 3 - Three-Tier Application Stack (PHP, MySQL, and phpMyAdmin)

## Objective
The goal of this task is to complete the multi-container application stack using Docker Compose. This involved defining the configuration for a MySQL database and a phpMyAdmin container, ensuring successful connection with the existing PHP web server. I am focusing on meeting the precise environmental and port requirements specified in the task.

---

## ⚙️ Steps Performed

### 1️⃣ Service Definition and Configuration
The `docker-compose.yml` file was completed by defining the required properties for the database (`db`) and the administration interface (`phpmyadmin`).

**Key Configuration Summary**
The following services and their properties were defined:

| Service | Configuration Detail |
| :--- | :--- |
| **db (MySQL)** | **Image Source**<br>Derived from `mysql:8.0` |
| | **Restart Policy**<br>Set to `always` |
| | **Port Mapping**<br>`9906:3306` (Host:Container) |
| | **Environment**<br>Defined all four required `MYSQL_*` variables for schema and user creation. |
| **phpmyadmin** | **Image Source**<br>Derived from `phpmyadmin/phpmyadmin:latest` |
| | **Restart Policy**<br>Set to `always` |
| | **Port Mapping**<br>`8080:80` (A port different from 8000) |
| | **Dependency & Host**<br>`depends_on: db` and `PMA_HOST: db` |

### 2️⃣ Deployment and Verification

**Pre-Deployment Step (c)**
The PHP source codes (provided in the question) were copied into the `php/src` folder. This action ensures that the volume-mounted PHP application is ready for execution upon container startup.

**Deployment Command**
The entire stack was built and started, using the following command:
```bash
docker compose up --build -d
```

**Application Verification**
The successful deployment was verified by accessing the web application and the admin tool using the mapped host ports.

| Service | Access URL | Verification Result | Login Details (for Admin) |
| :--- | :--- | :--- | :--- |
| **PHP Application** | `http://localhost:8000` | The page confirms a successful connection to the MySQL server. | N/A |
| **Database Admin** | `http://localhost:8080` | Confirmed access to the phpMyAdmin login screen and ability to log in. | Username: `root`<br>Password: `MYSQL_ROOT_PASSWORD` |

---

## Outcome
I have successfully integrated all three containers (PHP, MySQL, and phpMyAdmin) into a single, cohesive Docker Compose stack. This task demonstrated proficiency in setting up complex service interdependencies, environmental configurations, and host-to-container port mapping for a complete web application environment.