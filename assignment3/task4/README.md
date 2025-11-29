# Task 4: Create PhpMyAdmin and MySQL Apps (ClusterIP & Storage)

## Objective
The goal of this task was to deploy a stateful application stack consisting of a backend database (MySQL) and a frontend management interface (PhpMyAdmin). This involved creating Persistent Volumes (PV) for data durability and exposing services internally using ClusterIPs

---

## Step 1: Persistent Storage Setup
To ensure database data is preserved across pod restarts, I defined a Persistent Volume (PV) and a Persistent Volume Claim (PVC).

**File:** `mysql-storage.yaml`

This file defines:
* A **PersistentVolume** with 1Gi of storage capacity.
* A **PersistentVolumeClaim** requesting 1Gi of storage, which will be mounted by the MySQL deployment 

**Command:**
```bash
kubectl apply -f mysql-storage.yaml
````

**Screenshot - Creating Storage:**

<img src="images/terminal/kubectl apply -f mysql-storage.png" width="600">

-----

## 3\. Step 2: Deploy MySQL Database

I deployed the MySQL container and mounted the PVC created in the previous step.

**File:** `mysql-deployment.yaml`

This file defines:

  * A Deployment running the `mysql:5.7` image.
  * An environment variable `MYSQL_ROOT_PASSWORD` set to `123456`.
  * A volume mount at `/var/lib/mysql` linked to the PVC.
  * A **Service** of type `ClusterIP` (headless) to expose the database internally on port 3306.

**Command:**

```bash
kubectl apply -f mysql-deployment.yaml
```

**Screenshot - Deploying MySQL:**

<img src="images/terminal/kubectl apply -f mysql-deployment.png" width="600">

-----

## Step 3: Deploy PhpMyAdmin

I deployed the frontend application to manage the database.

**File:** `phpmyadmin-deployment.yaml`

This file defines:

  * A Deployment running the `phpmyadmin/phpmyadmin` image.
  * Environment variables `PMA_HOST` (pointing to the `mysql` service) and `PMA_PORT`.
  * A **Service** of type `ClusterIP` to expose the frontend internally on port 80.

**Command:**

```bash
kubectl apply -f phpmyadmin-deployment.yaml
```

**Screenshot - Deploying PhpMyAdmin:**

<img src="images/terminal/kubectl apply -f phpmyadmin-deployment.png" width="600">

-----

## Step 4: Verification

I verified that the storage, deployments, and services were created successfully.

**Cleaning up previous tasks:**
I removed the `hello` deployment from Task 3 to free up resources.

```bash
kubectl delete deployment hello
```

**Checking Pod Status:**
I monitored the pods until both `mysql` and `phpmyadmin` reached the `Running` state.

```bash
kubectl get pods
```

**Screenshot - Pod Verification (CLI):**

<img src="images/terminal/kubectl get pods.png" width="600">

I also verified the workload status using the Kubernetes Dashboard.

**Screenshot - Pod Verification (Dashboard):**

<img src="images/minikube dashboard stating pods.png" width="600">

-----

## Step 5: Accessing the Application

Since the apps are exposed via `ClusterIP` (internal only), I used port-forwarding to access the PhpMyAdmin interface from my local machine.

**Command:**

```bash
kubectl port-forward svc/phpmyadmin 8080:80
```

I then accessed `http://localhost:8080` in my browser and logged in using the credentials defined in the deployment.

**Screenshot - PhpMyAdmin Dashboard:**

<img src="images/PHPmyadmin dashboard.png" width="600">

```
