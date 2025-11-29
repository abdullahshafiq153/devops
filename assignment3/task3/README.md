# Task 3: Scale Up Your App (Node Affinity & Selectors)

## 1. Cluster Setup (Multi-Node)
To verify scheduling behavior, I first required a multi-node environment. I deleted the existing single-node cluster and initialized a new Minikube cluster with 2 nodes.

**Commands:**
```bash
minikube delete
minikube start --nodes 2
````

**Screenshot - Deleting old cluster:**
<img src="images/terminal/minikube delete cluster.png" >

**Screenshot - Starting 2-node cluster:**
<img src="images/terminal/minikube start with 2 nodes.png" >

I verified the nodes were ready using `kubectl get nodes`.

**Screenshot - Node Verification:**
<img src="images/terminal/kubectl get nodes.png" >

I also verified the creation of the containers in the Docker Dashboard.

**Screenshot - Docker Dashboard:**
<img src="images/docker desktop with 2 new containers of minikube.png" >

-----

## 2\. Configuration Analysis

I analyzed the `hello-deployment.yaml` configuration file. Below is the description of the key fields:

  * **a. kind:** `Deployment`
      * **Explanation:** This specifies that the Kubernetes object is a Deployment. Deployments manage a set of identical pods, ensuring the desired number are running and handling updates (like rolling out new versions).
  * **b. replicas:** `2`
      * **Explanation:** This field tells Kubernetes to run exactly two copies (instances) of the pod at all times.
  * **c. replicas.strategy:** `RollingUpdate`
      * **Explanation:** This defines how updates are handled. The RollingUpdate strategy ensures zero downtime by incrementally replacing old pods with new ones, rather than stopping all old ones at once.
  * **d. spec.template.spec.affinity:** `podAntiAffinity`
      * **Explanation:** This section creates a rule for scheduling. Specifically, it uses anti-affinity to ensure high availability. It tells Kubernetes: "Do not schedule a pod with the label app: hello on a node if that node already has a pod with that label." This forces the two pods to run on different nodes.
  * **e. spec.template.spec.containers:**
      * **Explanation:** This section defines the actual container to run inside the pod. It specifies the image (`pbitty/hello-from:latest`) and the networking port (80) that the container exposes.

-----

## 3\. Initial Deployment (Anti-Affinity)

I applied the initial deployment which contained the `podAntiAffinity` rule.

**Command:**

```bash
kubectl apply -f hello-deployment.yaml
```

**Screenshot - Applying Deployment:**
<img src="images/terminal/first deployment.png" >

I checked the pod locations. As expected, the anti-affinity rule forced the pods to run on **different nodes** (`minikube` and `minikube-m02`).

**Command:**

```bash
kubectl get pods -o wide
```

**Screenshot - Pod Locations (Separate Nodes):**
<img src="images/terminal/checking pod locations using kubectl get pods.png" >

-----

## 4\. Modifying the Deployment (Node Selector)

To demonstrate controlling placement, I deleted the previous deployment to start fresh.

**Command:**

```bash
kubectl delete deployment hello
```

**Screenshot - Deleting Deployment:**
<img src="images/terminal/deleting first deployment.png" >

I verified no pods were running.

**Screenshot - Empty Pods:**
<img src="images/terminal/checking pods after deletion of first deployment using kubectl get pods.png" >

### Labeling the Node

I assigned a specific label (`disktype=ssd`) to the primary node (`minikube`) to target it specifically.

**Command:**

```bash
kubectl label nodes minikube disktype=ssd
```

**Screenshot - Labeling Node:**
<img src="images/terminal/labeled node using kubectl label nodes minikube disktype=ssd.png" >

I verified the label was applied.

**Screenshot - Label Verification:**
<img src="images/terminal/kubectl get nodes --show-labels.png" >

### Deploying Updated Configuration

I created a new configuration file `hello–deployment-updated.yaml`.

  * **REMOVED:** The `affinity` block.
  * **ADDED:** A `nodeSelector` block to force pods to the node with `disktype: ssd`.

**Command:**

```bash
kubectl apply -f hello–deployment-updated.yaml
```

**Screenshot - Applying Updated Deployment:**
<img src="images/terminal/kubectl apply -f hello–deployment-updated.png" >

I verified the pod locations again. This time, **both** pods were running on the **same node** (`minikube`), confirming that the `nodeSelector` successfully overrode the default scheduling behavior.

**Command:**

```bash
kubectl get pods -o wide
```

**Screenshot - Final Verification (Same Node):**
<img src="images/terminal/kubectl get pods -o wide after new hello-deployment-updated.png">

```