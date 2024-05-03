# gcpCloud Project for Wiz

Technical Assessment: Step-by-step Guide with requirements


Requirements

1.	Web Application Tier
1.1.	Develop a containerized web application using React with TypeScript and Redux.
1.2.	Deploy the application on a Kubernetes cluster.
1.3.	Ensure the application is exposed through a cloud-native load balancer.

2.	Database Tier
2.1.	Set up a MongoDB server on a VM, using an outdated Linux version.
2.2.	Ensure MongoDB uses authentication.
2.3.	Configure the VM with broad permissions (highly privileged).

3.	Storage Tier
3.1.	Create a publicly readable object storage bucket for MongoDB backups.
3.2.	Script and schedule regular MongoDB backups.
3.3.	Store the backups in the object storage with permissions for public read access.

4.	Kubernetes Configuration
4.1.	Deploy the Kubernetes cluster in the same network as the MongoDB VM.
4.2.	Containerize the web application and deploy it to the Kubernetes cluster.
4.3.	Configure the container to use MongoDB authentication, typically via a connection string.
4.4.	Include a file named "___exercise.txt" within the container image with specific content.

5.	Security and Access
5.1.	Set up routing to provide public access to the Kubernetes cluster.
5.2.	Provide the container with cluster-admin privileges as described in the “Permissive RBAC permissions” section.

6.	Infrastructure and Tools
6.1.	Consider using Infrastructure-as-Code tools like Terraform for Kubernetes deployment and Helm for package management.
6.2.	Review and apply appropriate Google Cloud IAM policies.

7.	Presentation and Review
7.1.	Prepare a PowerPoint presentation for a technical interview panel.
7.2.	Include details on the setup, challenges faced, and solutions implemented.
7.3.	Conduct a live demonstration of the setup.



# Step 1: Development Environment Setup
Install Necessary Tools
•	Node.js and npm
•	Docker for containerization
•	Google Cloud SDK
•	Kubernetes command line tool (kubectl)
•	Ruby and Rails (ensure it has the version that matches the Rails API requirements)

Setup Local Development Environment
•	Clone/create the React + TypeScript project for the frontend.
•	Set up the Ruby on Rails project for the API layer.
•	Ensure MongoDB is installed locally for initial development and testing.

Build the Ruby on Rails API Docker Image
1.	Rebuild the Docker image: Now, it can rebuild the Docker image.
docker build -t gcpcloudapi . 
2.	Run the new container: After rebuilding the image, it can run the container again.
docker run -d --name gcpcloudapi -p 3000:3000 gcpcloudapi 
3.	Check the logs: Finally, checking the logs after running the new container can help it confirm whether everything is set up correctly and functioning as expected.
docker logs gcpcloudapi

Build the React TypeScript Docker Image
1.	Build the Docker Container for React: Navigate to the directory containing the React application and Dockerfile, then run:
docker build -t checklist . 
2.	Run the Docker Container: After building the image, it can start a container:
docker run -d --name checklist -p 3001:3000 checklist

1.	Build the Docker Container for React: Navigate to the directory containing the React application and Dockerfile, then run: 
docker build -t checklist
2.	Run the Docker Container: After building the image, it can start a container:
docker run -d –name checklist -p 3001:3000 checklist

Saving for later:
  docker build -t gcr.io/gcpcloudproject-420220/tasky:latest .
  
  gcloud auth configure-docker
  
  docker push gcr.io/gcpcloudproject-420220/tasky:latest
  
  gcloud container clusters create "tasky-cluster" --zone "us-central1-a" --num-nodes "3" --project gcpcloudproject-420220
  
  gcloud container clusters get-credentials tasky-cluster --zone us-central1-a --project gcpcloudproject-420220
  
  kubectl apply -f deployment.yml
  
  kubectl get services


# Step 2: Application Development
Backend (Ruby on Rails)
•	Develop the API using Ruby on Rails.
•	Configure MongoDB integration.
•	Add routes, controllers, and models as required for the application.

Frontend (React + TypeScript + Redux)
•	Set up React with TypeScript.
•	Integrate Redux for state management.
•	Develop components, services, and state management to interact with the Rails API.

Containerization
•	Dockerize the React application.
•	Dockerize the Rails API.
•	Ensure both containers can communicate via Docker networking.

Dockerizing the React Frontend
	Create a Dockerfile for the React App
•	Navigate to the React app directory.
•	Create a Dockerfile with the following contents:
Dockerfile  
Copy code 
# Use an official Node runtime as a parent image 
FROM node:16.19.0 
# Set the working directory 
WORKDIR /app 
# Copy package.json and package-lock.json 
COPY package*.json ./ 
# Install dependencies 
RUN npm install 
# Bundle app source 
COPY . . 
# Build the app 
RUN npm run build 
# Install serve to serve the app 
RUN npm install -g serve 
# Serve the app CMD ["serve", "-s", "build", "-l", "3000"] 
# Expose port 3000 EXPOSE 3000   
•	This Dockerfile sets up a Node.js environment, installs dependencies, builds the React app, and serves it using serve.
	Build and Test the Docker Image
•	Run docker build -t react-app . to build the Docker image.
•	Run docker run -p 3000:3000 react-app to test locally.
Dockerizing the Rails API
	Create a Dockerfile for Rails API
•	Navigate to the Rails app directory.
•	Create a Dockerfile:Dockerfile  Copy code # Use Ruby official image FROM ruby:3.2.2 # Install dependencies RUN apt-get update -qq && apt-get install -y nodejs npm # Set working directory WORKDIR /app # Copy the Gemfile and Gemfile.lock COPY Gemfile Gemfile.lock ./ # Install gems RUN bundle install # Copy the main application COPY . . # Expose port 3001 EXPOSE 3001 # Start the main process. CMD ["rails", "server", "-b", "0.0.0.0"]   
•	This Dockerfile installs Ruby and Node.js, installs gems, and starts the Rails server.
	Build and Test the Docker Image
•	Run docker build -t rails-api . to build the Docker image.
•	Run docker run -p 3001:3001 rails-api to test locally.
Dockerizing MongoDB
	Create a Dockerfile for MongoDB
•	You can use the official MongoDB image directly. Configure MongoDB to run with authorization enabled by default. 
•	Create a docker-compose.yml file to configure MongoDB service:yaml  version: '3.8' services: mongodb: image: mongo:4.0.28 environment: MONGO_INITDB_ROOT_USERNAME: dbadmin MONGO_INITDB_ROOT_PASSWORD: Yellowstone2019 volumes: - mongodb-data:/data/db ports: - 27017:27017 command: ["mongod", "--auth"] volumes: mongodb-data:   
•	This setup initializes a MongoDB container with a volume for data persistence, sets up the root user, and enables authentication.
2. Kubernetes Deployment
	Create Kubernetes Configurations
•	The app will need Deployment and Service configurations for each component (React, Rails, MongoDB).
•	Ensure that the Rails API and React communicate using the service names defined in Kubernetes.
	Deploy Using Google Kubernetes Engine (GKE)
•	Set up a project in GCP.
•	Enable Kubernetes API.
•	Use gcloud command line tool to configure Docker to push to Google Container Registry (GCR).
•	Push the Docker images to GCR.
•	Use kubectl to deploy the services in GKE.
3. Setting Up IAM and VPC
	IAM Permissions
•	Ensure that the necessary IAM permissions are granted for the Kubernetes engine, GCR access, and other required services.
	VPC Configuration
•	Ensure that the networking is correctly set up in the VPC for communication between different services within the Kubernetes cluster.
4. Terraform Integration
	Terraform Automation
•	Use Terraform to script the creation of the GCP resources.
•	GCP can help generate starter Terraform scripts based on manual configurations which can then be modified as needed.
5. Documentation
	Create Detailed Documentation
•	Document every step, including Dockerfile configurations, Kubernetes setup, and Terraform scripts.


# Step 3: MongoDB Setup on VM
Create and Configure VM
•	Use Google Cloud Console or gcloud CLI to create a VM instance with an older Linux version and install MongoDB.
•	Configure MongoDB with authentication enabled.


Database Security and Networking
•	Set up necessary firewall rules to allow traffic from the Kubernetes cluster to the MongoDB VM.
•	Ensure the MongoDB instance is using secure connection strings.


# Step 4: Kubernetes Cluster Setup
Deploy Kubernetes Cluster
•	Use Google Kubernetes Engine (GKE) to create a cluster.
•	Configure kubectl to connect to the GKE cluster.

Deploy Applications
•	Deploy the Rails API container to Kubernetes.
•	Deploy the React container to Kubernetes.
•	Ensure communication between the Rails API and MongoDB via environment variables or config maps.

Load Balancer and Public Access
•	Configure a Google Cloud Load Balancer to expose the React application publicly.


# Step 5: MongoDB Backups and Object Storage
Configure Object Storage
•	Create a Google Cloud Storage bucket for MongoDB backups with public read access.

Backup Scripting
•	Write and schedule a script to backup MongoDB regularly and upload backups to the designated Cloud Storage bucket.


# Step 6: Final Testing and Validation
Security Checks and IAM Configuration
•	Review and adjust IAM roles for the Kubernetes cluster and VM to ensure least privilege.
•	Ended up making it overly-permissive, not least-privilege due to time restraints.

End-to-End Testing
•	Perform thorough testing to ensure that all components interact correctly.
•	Validate public access to the web application and the accessibility of MongoDB backups via an external URL.



# Step 7: Documentation and Preparation for Presentation
Prepare Documentation
•	Document the architecture, setup process, and any challenges or solutions.

Prepare for Live Demonstration
•	Prepare slides and a demo script for the interview presentation.
•	Ensure smooth navigation through the live demonstration of the application.






