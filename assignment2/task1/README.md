# 🐳 Task 1 - Dockerfile with Git

## Objective
The goal of this task was to create a lightweight Docker image with **Git** installed, using **Alpine Linux** as the base image.  
This demonstrates the ability to build, tag, and run a custom image, then verify its contents using Docker commands.

## Steps Performed

### 1-Dockerfile Creation
- Used `alpine:latest` as the base image for a small and efficient setup
- Installed Git using the Alpine package manager `apk`
- Combined update, install, and cleanup commands to reduce image size

**File:** `assignment2/task1/Dockerfile`
```dockerfile
# Use Alpine Linux as the base image
FROM alpine:latest

# Install Git and clean up cache to keep the image lightweight
RUN apk update && \
    apk add git && \
    rm -rf /var/cache/apk/*
```

### 2-Image Build and Tagging
**Initial attempt:**
```bash
docker build -t Qu1:v1.0 .
```
**Error:** Docker image tags must be lowercase

**Corrected command:**
```bash
docker build -t qu1:v1.0 .
```
**Successfully built and tagged the image as `docker.io/library/qu1:v1.0`**

### 3-Running the Container
Created a detached container:
```bash
docker run -d --name task1_container qu1:v1.0
```
The container stopped immediately because there was no foreground process running.

### 4-Attaching and Verifying Git
To interact with the container, ran it in interactive mode:
```bash
docker run -it --name task1_container qu1:v1.0 /bin/sh
```

Verified Git installation:
```bash
git --version
```
**Output:** `git version 2.49.1`



## Outcome
Successfully created and tested a minimal Docker image containing Git.

**Demonstrated:**
- Docker image layering
- Correct tagging convention  
- Container interactivity using `attach` and `exec`