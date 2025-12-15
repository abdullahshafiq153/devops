# Assignment 4: Kubernetes Cluster Administration

**Student Name:** Abdullah Shafiq

**Registration Number:** 04072113025

**Assignment Number:** 4 

**Course:** Cloud Devops 


-----

## Assignment Overview

This repository contains the documentation and execution reports for the setup, configuration, deployment, and upgrade of a production-grade Single-Node Kubernetes cluster.

Each task has been documented in a separate file containing the step-by-step commands executed, the reasoning behind configuration choices, and the troubleshooting steps taken to resolve infrastructure issues (such as storage provisioning and version upgrades).

## Task Reports

Please click the links below to view the detailed report for each specific task:

### [Task 1: Single Node Production Cluster Setup](./task1/README.MD)

  * **Scope:** Cluster provisioning using `kubeadm` v1.32.
  * **Key Activities:** System preparation (Swap/Sysctl), Container Runtime (Containerd) setup, and Control Plane initialization.

### [Task 2: Cluster Configuration & Observability](./task2/README.MD)

  * **Scope:** Infrastructure configuration and Monitoring tools.
  * **Key Activities:** Enabling workloads (Taint removal), configuring Nginx Ingress Controller, and deploying the Prometheus/Grafana monitoring stack via Helm.

### [Task 3: Stateless Application Deployment](./task3/README.MD)

  * **Scope:** Deploying the "Guestbook" application.
  * **Key Activities:** Deploying multi-tier microservices (Redis Leader/Follower + PHP Frontend) and exposing the application using a custom Ingress resource.

### [Task 4: Cluster Upgrade (v1.32 → v1.33)](./task4/README.MD)

  * **Scope:** In-place cluster upgrade.
  * **Key Activities:** Upgrading Control Plane and Node components, handling pre-flight check timeouts, and verifying deployment persistence post-upgrade.

-----

## Technical Environment

  * **OS:** Ubuntu 24.04 LTS (VM)
  * **Kubernetes Version:** Upgraded from v1.32.10 to v1.33.7
  * **Container Runtime:** Containerd
  * **Networking:** Calico CNI
  * **Ingress:** Nginx Ingress Controller (DaemonSet)
  * **Monitoring:** Kube Prometheus Stack (Helm)