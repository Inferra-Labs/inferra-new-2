# Inferra Labs - Full Stack Web Application

This repository contains the complete source code for the Inferra Labs website, a feature-rich, full-stack application built with React, Node.js, Express, and MongoDB. The entire application is containerized with Docker for easy setup, development, and deployment.

## Project Overview

This platform serves as the digital hub for the Inferra Labs tech club. It features a modern, responsive frontend, a powerful admin portal with full CMS capabilities, and a robust backend to manage all data dynamically.

### Key Features:
- **Dynamic Content:** All site content (events, projects, team members, etc.) is fetched from a live backend and managed via a database.
- **Role-Based Admin Panel:** A secure, role-based admin portal (Full Access, Content Manager, Recruitment Manager, View-Only) allows for granular permissions for CRUD operations and recruitment management.
- **Full Stack Integration:** A React frontend that communicates with a Node.js/Express backend API.
- **Persistent Storage:** A MongoDB database managed with the Mongoose ODM.
- **Containerization:** The entire stack (frontend, backend, database) is orchestrated with Docker and Docker Compose for a consistent and portable development and production environment.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker, Docker Compose

## Project Structure

```
.
├── components/         # React components for the frontend
├── server/             # All backend source code (Node.js/Express)
│   ├── models.ts       # Mongoose schema definitions
│   ├── routes/         # API route definitions
│   └── seed.ts         # Database seeding script
│   └── ...
├── Dockerfile          # Docker configuration for the frontend (React + Nginx)
├── Dockerfile.server   # Docker configuration for the backend (Node.js)
├── docker-compose.yml  # Defines and orchestrates all services
├── api.ts              # Frontend API service layer
├── App.tsx             # Main React application component
└── ...
```

## Getting Started

Follow these instructions to get the entire application running on your local machine.

### Prerequisites

- **Docker** and **Docker Compose** must be installed on your system.
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Set Up Environment Variables

The backend server requires environment variables to connect to the database and secure JWTs.

- Navigate into the `server/` directory.
- Create a copy of the example environment file:
  ```bash
  cp .env.example .env
  ```
- The `.env` file is pre-configured to work with the Docker Compose setup. The `DATABASE_URL` should point to the MongoDB container. You can change `JWT_SECRET` to a new, random string for better security.

### 2. Build and Run the Application with Docker

From the **root directory** of the project, run the following command:

```bash
docker-compose up --build
```

- This command will:
  1. Pull the official MongoDB image.
  2. Build the Docker image for the backend server (`Dockerfile.server`).
  3. Build the Docker image for the frontend client (`Dockerfile`).
  4. Start all three containers (`mongo`, `server`, `client`) and link them together.
- The first time you run this, it may take a few minutes to download the images and build the containers.

### 3. Seed the Database

With the containers running, you need to populate the database with initial data. Open a **new terminal window** and run the following command from the project's **root directory**:

```bash
docker-compose exec server npm run db:seed
```
This command runs the `seed.ts` script to populate your MongoDB database with initial data (admin users, departments, projects, etc.).

### 4. Access the Application

- **Website:** Open your browser and navigate to `http://localhost:8080`.
- **Admin Portal:** Log in at `http://localhost:8080/admin-login` with:
  - **Full Access:** `admin` / `admin123`
  - **Content Manager:** `editor` / `editor123`
  - **Recruitment Manager:** `recruiter` / `recruiter123`
  - **View-Only:** `viewer` / `viewer123`

### 5. Managing the Application

- **To stop the application:**
  ```bash
  docker-compose down
  ```
- **To view logs:**
  ```bash
  docker-compose logs -f [service_name]  # e.g., server, client
  ```
- **To access the MongoDB shell:**
  ```bash
  docker-compose exec mongo mongosh
  ```