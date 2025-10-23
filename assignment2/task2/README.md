# Task 2 - Multi-Container Application with Docker Compose

## Objective
The goal of this task was to learn and execute a complete multi-container application using Docker Compose. This involved setting up a Python (Flask) web application that counts visits, storing the count persistently in a separate Redis database container.


## Steps Performed

### 1-Project Files and Configuration
The application stack requires four main files:
- `requirements.txt`: Lists the Python libraries needed (Flask and Redis)
- `app.py`: The main Python application code that uses Redis to store the hit count
- `Dockerfile`: Instructions to build the custom web image
- `docker-compose.yml`: Orchestrates (connects and runs) both the web service and the redis service

**Dockerfile (Web Service Image)**
This file builds the image for the Python web application.
```dockerfile
FROM python:3.9-alpine
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
```

**Docker Compose Configuration**
This file defines two services (web and redis) and how they connect.
```yaml
version: '3.8'

services:
  web:
    # Build from the local Dockerfile
    build: .
    # Mounts local files for easy development (changing code without rebuilding)
    volumes:
      - .:/code
    # Command to start the Flask server
    command: flask run --host=0.0.0.0 --port=5000
    # Map external port 8000 to internal container port 5000
    ports:
      - "8000:5000"
    # Wait for Redis to start first
    depends_on:
      - redis
    environment:
      - FLASK_APP=app.py

  redis:
    # Uses the official, pre-built Redis image
    image: "redis:alpine"
```

### 2-Deployment and Verification
**Deployment Command**
Used the following command to build the image and start both containers together:
```bash
docker compose up -d --build
```

**Terminal Output and Container Status**
The terminal showed the services starting and building the custom `web` image.

| Command | Status | Observation |
| :--- | :--- | :--- |
| `docker compose up -d --build` | **Success** | Both containers (`web` and `redis`) started and were successfully connected using Docker's internal networking |
| `docker compose ps` | **Running** | The `web` container showed port `8000->5000/tcp` |

**Application Verification**
Accessed the application in the web browser to confirm it was working and connecting to Redis.

- **URL:** `http://localhost:8000`
- **Result:** The page successfully loaded and displayed the message: **"Hello World! I have been seen 1 times."**
- **Test:** Reloading the page caused the count number to increase (2, 3, 4, etc.), which confirms that the `web` service is successfully communicating with the `redis` service to read and update the stored count




## Outcome
Successfully deployed a multi-container application using Docker Compose. This task demonstrated how to use two separate services (an application server and a database) and connect them through a single configuration file, making the deployment process simple and reliable.