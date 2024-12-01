# 🍽️ Easy-Meal

Easy-Meal is a web app designed to simplify interactions between users and restaurants. Easy-Meal offers two interfaces: one for customers and one for restaurant owners.

### 🌟 Customer Features
- 🔍 Restaurant search
- 📅 Make reservations by specifying date, time, number of people, and desired dishes
- 👥 Share the order with other users, allowing each person to add their orders to a shared reservation

### 🛠️ Restaurant Owner Features
- 📋 View and confirm reservations made by customers
- 🍲 View orders and the necessary ingredients for preparing dishes, enabling better organization

## 🛠️ Installation

To install Easy-Meal, you need to clone the repository. Additionally, make sure you have Docker and Docker Compose installed.

With the Docker daemon running, execute the following commands to start the service for the first time:

```
docker-compose up -d
```

This command will create the 4 Docker images required for the application to function and will start the containers. After creating the images and starting the containers, you'll need to create the database tables by accessing the following link in your browser:

[Adminer](http://localhost:8000) or by entering the address `http://localhost:8000` in the search bar.

You’ll access the Adminer administration page, a tool for database management. Use the following login credentials:

- **System**: PostgreSQL  
- **Server**: db  
- **Username**: postgres  
- **Password**: postgres  
- **Database**: easymeal  

### 🔐 Changing Credentials

To change the database login credentials, edit the `docker-compose.yml` file. Be sure to update the environment variables for both the `db` service and the `nest` service, which connects to the database.

### 📦 Migration

A dump file with sample data is provided. To import it:
1. Navigate to the `backend` folder
2. Run `npm run postgres-load`

You can now access the application through your browser at the link:

[Web App](http://localhost:4200) or by entering the address `http://localhost:4200` in the address bar.

## 🧰 Usage

Here are some useful commands for managing the software:

- **🚀 Start the containers**: `docker-compose up -d`
- **🛑 Stop the containers**: `docker-compose stop`
- **🔄 Restart the containers**: `docker-compose restart`
- **🗑️ Remove the containers**: `docker-compose down`
- **📜 View logs**: `docker-compose logs -f`
- **🔧 Rebuild the images**: `docker-compose up -d --build`
- **🔑 Access the database**: `http://localhost:8000`
- **🧹 Remove the images**: `docker-compose down --rmi all`
- **🖥️ Run commands in containers**: `docker-compose exec <service> <command>`
