# RICA Import Permit Application Service

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express-API-000000?style=for-the-badge&logo=express)

This is a full-stack application for the RICA Import Permit service, built for the Irembo Service Onboarding assessment. It features a multi-step React form and a Node.js/Express backend that handles validation, data persistence, and sends HTML email notifications.

---

## 🎥 Project Demo

A complete video demonstration of the application can be viewed here:


---

## 🛠️ Local Setup Instructions

### Prerequisites
-   Node.js (v16 or higher)
-   Git

### 1. Clone the Repository
Open your Git Bash terminal and clone the project.

```bash
git clone [Your GitHub Repository URL]
cd rica-import-permit
```

### 2. Configure the Backend
This step installs dependencies and sets up the environment variables for the server.

```bash
# Navigate to the backend directory
cd backend

# Install packages
npm install

# Create the .env file from the example
# (On Windows, you may need to manually copy .env.example to .env)
cp .env.example .env
```
**Next, open the newly created `.env` file and add your credentials.** You must provide a valid `GMAIL_USER` and a 16-character Google **App Password** for `GMAIL_APP_PASS` to send real emails.

### 3. Configure the Frontend
In a **new terminal**, navigate to the frontend directory and install its dependencies.

```bash
# Navigate to the frontend directory from the project root
cd frontend

# Install packages
npm install
```

---

## 🚀 Running the Application

You must have two terminals running simultaneously.

#### **Terminal 1: Start Backend Server**

```bash
# In the /backend directory
npm run dev
```
The server will start on `http://localhost:5000`.

#### **Terminal 2: Start Frontend Application**

```bash
# In the /frontend directory
npm start
```
Your browser will open to `http://localhost:3000`, where you can use the application.

---
