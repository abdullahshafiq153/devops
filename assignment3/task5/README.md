# Task 5: Managing Configurations and Secrets

## Objective
The goal of this task was to enhance security and manageability by decoupling configuration data from the deployment manifests. I replaced hardcoded sensitive data (passwords) with **Kubernetes Secrets** and non-sensitive configuration (hostnames/ports) with **ConfigMaps**.

---

## Step 1: Creating the Secret
I created a Secret object to store the MySQL root password securely, rather than keeping it in plain text within the deployment YAML.

**File:** `secret.yaml`
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-pass
type: Opaque
stringData:
  password: "123456"
````

**Command:**

```bash
kubectl apply -f secret.yaml
```

**Screenshot - Applying Secret:**

<img src="images/terminal/kubectl apply -f secret.png" width="800">

-----

## Step 2: Creating the ConfigMap

I created a ConfigMap to store the database hostname and port. This allows the frontend configuration to be updated without changing the application code or deployment structure.

**File:** `configmap.yaml`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  db-host: "mysql"
  db-port: "3306"
```

**Command:**

```bash
kubectl apply -f configmap.yaml
```

**Screenshot - Applying ConfigMap:**

<img src="images/terminal/kubectl apply -f configmap.png" width="800">

-----

## Step 3: Updating Deployments

I modified the existing deployments from task 4 to consume these new configuration objects.

### MySQL Update

I updated the MySQL deployment to read the root password from the `mysql-pass` secret.

**Command:**

```bash
kubectl apply -f mysql-deployment-updated.yaml
```

**Screenshot - Updating MySQL:**

<img src="images/terminal/kubectl apply -f mysql-deployment-updated.png" width="800">

### PhpMyAdmin Update

I updated the PhpMyAdmin deployment to read the host and port from the `app-config` ConfigMap.

**Command:**

```bash
kubectl apply -f phpmyadmin-deployment-updated.yaml
```

**Screenshot - Updating PhpMyAdmin:**

<img src="images/terminal/kubectl apply -f phpmyadmin-deployment-updated.png" width="800">

-----

## Step 4: Verification

I verified that the pods restarted successfully with the new configuration.

**Command:**

```bash
kubectl get pods
```

**Screenshot - Pod Status:**

<img src="images/terminal/kubectl get pods.png" width="800">

### Verifying Environment Variables

To prove that the deployments were correctly pulling data from the Secret and ConfigMap, I inspected the environment variables inside the running pods.

**1. Verifying Secret Injection (MySQL):**
I checked the `MYSQL_ROOT_PASSWORD` variable inside the MySQL pod.

```bash
kubectl exec -it mysql-859dc5d94c-mdm5x -- env | grep MYSQL_ROOT_PASSWORD
```

**Result:** `MYSQL_ROOT_PASSWORD=123456` (Correctly loaded from Secret)

**Screenshot - MySQL Env Var:**

<img src="images/terminal/kubectl exec -it mysql-859dc5d94c-mdm5x -- env | grep MYSQL_ROOT_PASSWORD.png" width="800">

**2. Verifying ConfigMap Injection (PhpMyAdmin):**
I checked the `PMA_` variables inside the PhpMyAdmin pod.

```bash
kubectl exec -it phpmyadmin-54d4c7467-kkrjn -- env | grep PMA
```

**Result:** `PMA_HOST=mysql` and `PMA_PORT=3306` (Correctly loaded from ConfigMap)

**Screenshot - PhpMyAdmin Env Vars:**

<img src="images/terminal/kubectl exec -it phpmyadmin-54d4c7467-kkrjn -- env | grep PMA.png" width="800">

```
