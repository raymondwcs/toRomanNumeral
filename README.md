# Using Multi-Node Kubernetes Clusters

## Overview
This tutorial demonstrates how to start a multi-node clusters on [minikube](https://minikube.sigs.k8s.io) and deploy a service to it.

## Preparation
- minikube 1.10.1 or higher
- kubectl

## Steps
1. Start a cluster with 2 nodes 
```
minikube start --nodes 2 -p multinode-demo
```
2. Verify the configuration of the cluster
```
kubectl get nodes
minikube status -p multinode-demo
```
3. Deploy our [`to-roman-numeral`](k8s/deployment.yaml) deployment
```
kubectl apply -f k8s/deployment.yaml
```
4. Verify the deployment
```
kubectl rollout status deployment/to-roman-numeral-deployment
```
5. Check the IP addresses of our pods, to note for future reference
```
kubectl get pods -o wide
```
6. Check the URL of our service
```
minikube service list -p multinode-demo
```
7. Run the service by opening the URL