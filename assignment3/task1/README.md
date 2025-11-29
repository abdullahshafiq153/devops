# Task 1: Create a Cluster and Deploy Applications

## Overview
This task involves setting up a local Kubernetes cluster using Minikube with the Docker driver, deploying a single-container application using the CLI, and utilizing the Kubernetes Dashboard to deploy a second application and generate YAML configurations.

## Prerequisites
* Docker Desktop installed and running.
* Minikube installed.
* Kubectl installed.

---

## Step 1: Initialize the Cluster
To create a single-node cluster on the local machine, I used the Minikube `start` command with the Docker driver option.

**Command:**
```bash
minikube start --driver=docker
````

**Output:**

<img src="images/terminal/minikube start.png">

**Verification:**
After the start process completed, I verified the cluster status to ensure the Control Plane, Kubelet, and APIServer were running.

**Command:**

```bash
minikube status
```

**Output:**

<img src="images/terminal/minikube status.png">


I also verified that the node was ready by querying the cluster nodes.

**Command:**

```bash
kubectl get nodes
```

**Output:**

<img src="images/terminal/kubectl get nodes.png">

-----

## Step 2: Deploy Single-Container App (CLI)

I deployed a single-container application (Nginx) using the `kubectl` command-line tool.

**Command:**

```bash
kubectl create deployment my-web-app --image=nginx
```

**Output:**

<img src="images/terminal/kubectl create deployment.png">

To check the cluster's runtime and verify the deployment was successful, I listed the deployments.

**Command:**

```bash
kubectl get deployments
```

**Output:**

<img src="images/terminal/kubectl get deployments.png">

-----

## Step 3: Kubernetes Dashboard Configuration

I enabled and accessed the Kubernetes Dashboard (GUI) to visualize the cluster resources.

**Command:**

```bash
minikube dashboard
```

*Note: This command opens a proxy connection and launches the dashboard in the default web browser.*

**Output:**

<img src="images/kubernetes dashboard with 1 deployment.png">



-----

## Step 4: Deploy via Dashboard & YAML Generation

As an alternative to the CLI, I used the Kubernetes Dashboard "Create from Form" wizard to deploy a second application named `dashboard-demo`.

**Configuration Used:**

  * **App name:** `dashboard-demo`
  * **Container image:** `nginx`
  * **Number of pods:** `1`
  * **Service:** None
  * **Namespace:** default

<img src="images/create from form configuration.png">

**YAML Template:**
Using the dashboard's preview feature, I generated the following YAML template for this deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dashboard-demo
  namespace: default
  labels:
    k8s-app: dashboard-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      k8s-app: dashboard-demo
  template:
    metadata:
      name: dashboard-demo
      labels:
        k8s-app: dashboard-demo
    spec:
      containers:
        - name: dashboard-demo
          image: nginx
          securityContext:
            privileged: false
```

<img src="images/YAML preview.png">

**Screenshot - Final Dashboard State:**
The image below shows both deployments (`my-web-app` and `dashboard-demo`) running successfully.

<img src="images/kubernetes dashboard with 2 deployment.png">










