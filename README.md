# Deploy Containerized Node.js Apps Using Docker Compose and Kubernetes

## About
This tutorial demonstrates how to deploy containerized apps using Docker Compose and Kubernetes.  There are two versions of a simple Node.js app, which converts numbers to roman numerals:

- [Single-server](monolithic/) 
- [Microservice/API](soa/)

## Preparation
- [minikube](https://minikube.sigs.k8s.io/docs/start/) 1.10.1 or higher
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Deploy the [Single-server](monolithic/) version using a multi-node Kubernetes cluster
1. Start a cluster with 2 nodes 
```
minikube start --nodes 2 -p multinode-demo
```
2. Set default profile
```
minikube profile multinode-demo
```
3. Verify the configuration of the cluster
```
kubectl get nodes
minikube status
```
3. Deploy deployment [to-roman-numeral-deployment](monolithic/k8s/deployment.yaml)
```
kubectl apply -f monolithic/k8s/deployment.yaml
```
4. Verify the deployment
```
kubectl rollout status deployment/roman-numeral-monolithic
```
5. Check the IP addresses of our pods, to note for future reference
```
kubectl get pods -o wide
```
6. Deploy [to-roman-numeral-svc](monolithic/k8s/service.yaml) service
```
kubectl apply -f monolithic/k8s/service.yaml
```
7. Obtain URL of `to-roman-numeral-svc` service

     Linux
     ```
     minikube service list
     ```
     MacOS
     ```
     minikube service --url roman-numeral
     ```
8. Run the service by opening the URL in the web browser

## Cleanup
1. Remove deployed service
```
kubectl delete service roman-numeral
```
2. Remove deployment
```
kubectl delete deployment roman-numeral-monolithic
```
3. Stop cluster
```
minikube stop -p multinode-demo
```
4. Remove cluster (profile)
```
minikube delete -p multinode-demo
```

## Reference
- [`kubectl` Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
