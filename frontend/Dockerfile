# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Angular CLI and project dependencies
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps

# Copy all the local files to the container
COPY . .

# Expose the port your app runs on
EXPOSE 4200

# Define the command to start your Angular app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
