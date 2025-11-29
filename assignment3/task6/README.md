# Task 6: Expose Services via NGINX Ingress Controller

## Objective
The final task of this assignment was to configure an **NGINX Ingress Controller** to expose the PhpMyAdmin service through a custom domain name (`phpmyadmin.local`). This provides a unified entry point (Layer 7 Load Balancer) for the cluster, enabling access via a recognizable URL rather than a raw IP or port.



---

## Step 1: Enable Ingress Controller
Minikube includes the NGINX Ingress Controller as an optional addon. I enabled it to allow Ingress resources to function.

**Command:**
```bash
minikube addons enable ingress
````

**Screenshot - Enabling Addon:**

<img src="images/terminal/minikube addons enable ingress.png" width="800">

I verified that the controller was successfully deployed in the `ingress-nginx` namespace.

**Command:**

```bash
kubectl get pods -n ingress-nginx
```

**Screenshot - Ingress Controller Status:**

<img src="images/terminal/kubectl get pods -n ingress-nginx.png" width="800">

-----

## Step 2: Create Ingress Resource

I defined an Ingress resource to route traffic requesting the host `phpmyadmin.local` to the internal `phpmyadmin` service on port 80.

**File:** `phpmyadmin-ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: phpmyadmin-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: phpmyadmin.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: phpmyadmin
            port:
              number: 80
```

**Command:**

```bash
kubectl apply -f phpmyadmin-ingress.yaml
```

**Screenshot - Ingress Creation:**

<img src="images/terminal/kubectl apply -f phpmyadmin-ingress.png" width="800">

-----

## Step 3: Network Configuration (Tunnel & Hosts)

Because I am using the Docker driver on macOS, the Ingress IP is not automatically reachable. To resolve the `Could not resolve host` error, I performed the following configuration steps:

### A. Start Minikube Tunnel

I started a tunnel in a separate terminal window to create a route from my localhost to the cluster's ingress point.

**Command:**

```bash
sudo minikube tunnel
```

*Note: This terminal must remain open for the connection to work.*

**Screenshot - Running Tunnel:**

<img src="images/terminal/sudo minikube tunnel.png" width="800">

### B. Map Domain in /etc/hosts

I configured my local DNS to map the custom domain to the loopback address (`127.0.0.1`), where the tunnel is listening.

**Command:**

```bash
sudo nano /etc/hosts
```

**Configuration Added:**

```text
127.0.0.1 phpmyadmin.local
```

-----

## Step 4: Verification

I verified that the Ingress resource was active and had an address assigned.

**Command:**

```bash
kubectl get ingress
```

**Screenshot - Ingress Status:**

<img src="images/terminal/kubectl get ingress.png" width="800">

Finally, I validated the setup by sending a request to the custom domain using `curl`.

**Command:**

```bash
curl -v [http://phpmyadmin.local](http://phpmyadmin.local)
```

**Result:**
The output returned `HTTP/1.1 200 OK` and the HTML content for the **PhpMyAdmin login page** (including `<title>phpMyAdmin</title>`). This confirms that the Ingress Controller successfully routed the request from `phpmyadmin.local` to the internal backend service.

**Screenshot - Curl Success:**

<img src="images/terminal/curl success.png" width="600">
