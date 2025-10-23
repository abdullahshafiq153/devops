**Name:** Abdullah Shafiq
**RegNo:** 04072113025

### **Docker Assignment Report**

**GitHub Repository:** `devops`
**GitHub Link:** `https://github.com/abdullahshafiq153/devops`

This document is my personal report on the completion of the three-task containerization assignment. The goal was to get hands-on experience with Docker by building custom images, managing multi-container applications with Docker Compose, and finally, deploying a full three-tier web application stack.

All the code for the tasks has been pushed to the private GitHub repository `DevOps-Assignment-2`, with collaborator `muhammadimranfarooqi` added as required. The repository is organized into `task1`, `task2`, and `task3` folders, each containing the necessary source files and a `README.md`.

---

### **Task 1: Creating a Lightweight Docker Image with Git**

**Objective:** The goal of this first task was straightforward: to create a custom Docker image based on Alpine Linux that has Git installed. The challenge was to keep the image as small and efficient as possible.

**My Approach and Steps:**

1.  **Writing the Dockerfile:** I started by creating a `Dockerfile` in the `task1` directory. I used `alpine:latest` as the base image because of its small size. To minimize the number of layers in the image (a Docker best practice), I combined the commands for updating the package list, installing Git, and cleaning the package cache into a single `RUN` instruction.

    ```dockerfile
    # Use Alpine Linux for a small base image
    FROM alpine:latest

    # Install Git and clean up in a single step to reduce image size
    RUN apk update && \
        apk add git && \
        rm -rf /var/cache/apk/*
    ```

2.  **Building and Tagging the Image:** I then built the image using the command `docker build -t Qu1:v1.0 .`. This is where I hit my first small hurdle. Docker returned an error because it requires image tags to be in lowercase. I corrected the command to `docker build -t qu1:v1.0 .`, and the build was successful.

3.  **Running and Verifying the Container:** My initial attempt to run the container in the background with `-d` flag resulted in a container that exited immediately because it had no long-running process. After removing that container, I ran a new one in interactive mode (`-it`) to get a shell. Once inside, I ran `git --version`, which confirmed that Git was correctly installed.

**Outcome:** I successfully created a minimal, functional Docker image with Git installed. This task helped me understand image layering, Docker's tagging convention, and the difference between running a container in detached versus interactive mode.

**Screenshots:**
<img src="/assignment2/task1/Docker Screenshot.png"
     alt=""
     style="float: left; margin-right: 10px;" />

<img src="/assignment2/task1/Terminal Screenshot.png"
     alt=""
     style="float: left; margin-right: 10px;" />
---

### **Task 2: Multi-Container Application with Flask and Redis**

**Objective:** This task involved deploying a two-service application using Docker Compose. The provided Python Flask app needed to connect to a Redis database to persistently count page visits. The key was to orchestrate both services to work together seamlessly.

**My Approach and Steps:**

1.  **Understanding the File Structure:** I set up the required files (`app.py`, `requirements.txt`, `Dockerfile`, `docker-compose.yml`) in the `task2` directory as per the instructions. The special requirement was to keep the `Dockerfile` very basic and move most of the configuration (like the command and volume mounting) to the `docker-compose.yml` file.

2.  **Configuring Docker Compose:** The `docker-compose.yml` file is where I defined the two services, `web` and `redis`. I specified for the `web` service to build from the current directory, mount the local code as a volume for development, and set the command to start the Flask server. Crucially, I used the `depends_on` key to ensure the `redis` container starts first. Docker Compose automatically creates a dedicated network for these services to communicate, so no manual network configuration was needed.

    ```yaml
    version: '3.8'
    services:
      web:
        build: .
        volumes:
          - .:/code
        command: flask run --host=0.0.0.0 --port=5000
        ports:
          - "8000:5000"
        depends_on:
          - redis
        environment:
          - FLASK_APP=app.py
      redis:
        image: "redis:alpine"
    ```

3.  **Deployment and Testing:** I ran the entire stack with `docker compose up -d --build`. The `--build` flag ensured the latest code was used. The command output showed both containers starting up correctly.

<img src="/assignment2/task2/Image Evidence/terminal.png"
     alt=""
     style="float: left; margin-right: 10px;" />

    To verify, I opened my web browser and went to `http://localhost:8000`. The page displayed "Hello World! I have been seen 1 times." Each time I refreshed the page, the number increased, proving that the Flask app was successfully communicating with the Redis database to store and retrieve the hit count.

<img src="/assignment2/task2/Image Evidence/Browser.png"
     alt=""
     style="float: left; margin-right: 10px;" />

**Outcome:** I successfully deployed a interconnected multi-container application. This task was a great practical introduction to Docker Compose, demonstrating how it simplifies the management of multi-service environments.

<img src="/assignment2/task2/Image Evidence/Docker Image.png"
     alt=""
     style="float: left; margin-right: 10px;" />

<img src="/assignment2/task2/Image Evidence/Doctor Container.png"
     alt=""
     style="float: left; margin-right: 10px;" />

---

### **Task 3: Three-Tier Web Stack with PHP, MySQL, and phpMyAdmin**

**Objective:** The final task was the most comprehensive. I was given a skeleton `docker-compose.yml` file and had to complete it to set up a full three-tier application consisting of a PHP web server, a MySQL database, and a phpMyAdmin interface for database management.

**My Approach and Steps:**

1.  **Completing the Docker Compose File:** The main work for this task was inside the `docker-compose.yml` file in the `task3` directory. I added the configuration for the two missing services, `db` and `phpmyadmin`, according to the precise specifications in the assignment.

    - For the **`db`** service (MySQL), I used the `mysql:8.0` image, set the restart policy to `always`, mapped the host port `9906` to the container's `3306`, and defined all the necessary environment variables for setting up the root password, database, and user.
    - For the **`phpmyadmin`** service, I used the latest image, set its restart policy, and mapped it to port `8080` on the host. I used `depends_on` to ensure the database starts first and set the `PMA_HOST` environment variable to `db` (the service name of the MySQL container) so phpMyAdmin knows where to find the database.

    ```yaml
    version: '3.9'
    services:
      php-apache-environment:
        # ... existing configuration ...
        ports:
          - 8000:80

      db:
        image: mysql:8.0
        restart: always
        ports:
          - "9906:3306"
        environment:
          MYSQL_ROOT_PASSWORD: MYSQL_ROOT_PASSWORD
          MYSQL_DATABASE: MYSQL_DATABASE
          MYSQL_USER: MYSQL_USER
          MYSQL_PASSWORD: MYSQL_PASSWORD
        volumes:
          - db-data:/var/lib/mysql

      phpmyadmin:
        image: phpmyadmin/phpmyadmin:latest
        restart: always
        ports:
          - 8080:80
        depends_on:
          - db
        environment:
          PMA_HOST: db
    volumes:
      db-data:
    ```

2.  **Adding PHP Source Code:** As instructed, I copied the provided PHP script files (`index.php` and `insert.php`) into the `php/src` directory. This directory is mounted as a volume into the PHP container, making the code immediately available.

3.  **Deployment and Verification:** I started the stack with `docker compose up --build -d`. 

<img src="/assignment2/task3/Image Evidence/Terminal.png"
     alt=""
     style="float: left; margin-right: 10px;" />

    Once all services were running, I proceeded to test them:
    - I navigated to **`http://localhost:8000`**. The page loaded and displayed a message confirming a successful connection to the MySQL database, which meant the PHP application was correctly talking to the `db` service.

<img src="/assignment2/task3/Image Evidence/Browser 1.png"
     alt=""
     style="float: left; margin-right: 10px;" />

<img src="/assignment2/task3/Image Evidence/Browser 2.png"
     alt=""
     style="float: left; margin-right: 10px;" />

    - I then navigated to **`http://localhost:8080`**. This brought up the phpMyAdmin login screen. I logged in using the username `root` and the password `MYSQL_ROOT_PASSWORD` (as defined in the environment variables), which granted me full access to manage the MySQL database.

<img src="/assignment2/task3/Image Evidence/Php My Admin.png"
     alt=""
     style="float: left; margin-right: 10px;" />

**Outcome:** I successfully built and verified a complete three-tier web application stack. This task solidified my understanding of how to define multiple interdependent services in Docker Compose, configure their environment, and manage persistent data with volumes.

<img src="/assignment2/task3/Image Evidence/Docker Images.png"
     alt=""
     style="float: left; margin-right: 10px;" />

<img src="/assignment2/task3/Image Evidence/Docker Container.png"
     alt=""
     style="float: left; margin-right: 10px;" />

### **Conclusion**

This assignment was an incredibly valuable hands-on journey through the core concepts of Docker and container orchestration. I progressed from building a simple single-container image to deploying a complex, multi-service application. I am now confident in my ability to write Dockerfiles, use Docker Compose to manage multi-container environments, and understand the architecture of a modern containerized application stack.