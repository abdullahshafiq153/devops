# Task 2: Converting Docker Compose to Kubernetes

## 1\. Objective

The goal of this task was to migrate a multi-container application (Python Web App + Redis) from a Docker Compose workflow to Kubernetes.This required modifying the composition file to be compatible with Kubernetes standards and using the `kompose` tool to generate the necessary deployment and service manifests.

## 2\. Application Setup & Image Registry

First, I prepared the application source code (`app.py`, `requirements.txt`, `Dockerfile`,`compose.yaml`) by following the Docker "Getting Started" tutorial (docs.docker.com/compose/gettingstarted).

Since Kubernetes cannot build images from a local Dockerfile during deployment, I built the image locally and pushed it to my public Docker Hub repository.

**Commands Used:**

```bash
# Build the image
docker build -t abdullah153/python-redis-app:latest .

# Push to Docker Hub
docker push abdullah153/python-redis-app:latest
```

<img src="images/terminal/docker push.png">

-----

## 3\. Modifying Docker Compose

I modified the `docker-compose.yaml` file to meet the assignment requirements.

**Changes Made:**

1.  **Image Source:** Replaced `build: .` with my repository image `abdullah153/python-redis-app:latest`.
2.  **Restart Policy:** Added `restart: always` to the web service.
3.  **Redis Ports:** Explicitly defined port `6379` for the Redis service to ensure the service is discoverable in Kubernetes.

**Final `docker-compose.yaml`:**

```yaml
version: "3"
services:
  web:
    image: abdullah153/python-redis-app:latest
    restart: always
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
    ports:
      - "6379:6379"
```

-----

## 4\. Installing Kompose

I installed `kompose`, a tool that automates the conversion of Docker Compose files to Kubernetes manifests.

**Commands Used:**

```bash
curl -L https://github.com/kubernetes/kompose/releases/download/v1.31.2/kompose-darwin-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose
```

<img src="images/terminal/installing compose.png">

-----

## 5\. Conversion and Deployment

I used `kompose` to convert the YAML file. This generated four files: `web-deployment.yaml`, `web-service.yaml`, `redis-deployment.yaml`, and `redis-service.yaml`.

**Conversion Command:**

```bash
kompose convert
```

<img src="images/terminal/kompose convert terminal.png">
<img src="images/kompose convert file creation.png">

I then applied these configurations to the Minikube cluster:

**Deployment Command:**

```bash
kubectl apply -f .
```

<img src="images/terminal/kubectl apply.png">

-----

## 6\. Verification

To verify the deployment, I listed the running services to ensure both `web` and `redis` were active.

**Command:**

```bash
kubectl get services
```

<img src="images/terminal/kubectl get services.png">

Finally, I exposed the web application to my local browser using the Minikube service command.

**Command:**

```bash
minikube service web
```

<img src="images/browser.png">

I also verified the status using the **Kubernetes Dashboard**, which confirmed that the new deployments were up and running.

<img src="images/minikube dashboard.png">