# RICA Import Permit Application Service

![Node.js](https://img.shields.io/badge/Node.js-16.0.0+-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18.0.0+-61DAFB?style=for-the-badge&logo=react)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express)

This repository contains the full-stack source code for the RICA Import Permit application, a project developed for the Irembo Service Onboarding assessment. It provides a digital platform for users to apply for tax exemptions on raw materials and capital goods, adhering strictly to the provided service requirement document.

The application is built with a focus on detail, robustness, and a professional user experience.

---

## 🎥 Project Demo

A complete video walkthrough of the service, demonstrating the entire user flow from form filling to successful submission and email notifications, is available at the link below:

**➡️ [Link to your recorded video on Loom, YouTube, or another platform]**

---

## ✨ Core Features

-   **Guided Multi-Step Form**: A clean 4-step user interface (Owner Details, Business Details, Product Info, Summary) for a seamless and intuitive application process.
-   **Dynamic & Conditional UI**: The form intelligently adapts to user input, such as displaying the National ID field for Rwandan citizens and the Passport Number field for Foreigners.
-   **Robust End-to-End Validation**: Comprehensive client-side validation for instant feedback and powerful server-side validation using **Joi** to ensure data integrity.
-   **Automated HTML Email Notifications**:
    -   Applicants receive a professionally styled HTML confirmation email upon successful submission.
    -   The processing team receives a detailed HTML notification containing a full report of all submitted data.
-   **Full-Stack Architecture**: A complete solution featuring a React frontend and a secure Node.js/Express backend.
-   **Live API Documentation**: Interactive API documentation is automatically generated using Swagger (OpenAPI).

---

## 🏛️ Technical Architecture

The project is a monorepo containing two primary packages: `/frontend` and `/backend`.

### Frontend (`/frontend`)

-   **Framework**: **React** (via Create React App)
-   **Form Management**: **React Hook Form** for high-performance state management and validation.
-   **API Communication**: **Axios** for handling all HTTP requests to the backend API.
-   **Styling**: Plain CSS with a modern, responsive design system using CSS variables.

### Backend (`/backend`)

-   **Framework**: **Node.js** with **Express.js** for the REST API.
-   **Validation**: **Joi** for declarative and powerful schema-based server-side validation.
-   **Email Service**: **Nodemailer** for sending transactional HTML emails, configured with a "bulletproof" verification step to handle credential errors gracefully.
-   **Data Persistence**: All submissions are saved to a local `/data/applications.json` file, managed by a dedicated service to handle file system operations safely.
-   **Development Server**: **Nodemon** is configured via `nodemon.json` to ignore the `/data` directory, preventing server restarts during data persistence.
-   **API Documentation**: **Swagger UI** and **Swagger-JSDoc** generate live, interactive API documentation directly from code annotations.

---

## 🛠️ Local Setup and Installation

Follow these steps in your Git Bash terminal to get the project running locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16.0.0 or higher)
-   [Git](https://git-scm.com/)

### 1. Clone the Repository

First, clone the project from GitHub to your local machine.

```bash
# Clone the repository
git clone [Your GitHub Repository URL]

# Navigate into the project's root directory
cd rica-import-permit
```

### 2. Configure the Backend

Navigate to the backend directory, install dependencies, and set up your environment variables.

```bash
# Go into the backend folder
cd backend

# Install npm packages
npm install
```

Next, create the `.env` file for your secret credentials.

```bash
# Create the environment file
touch .env
```

Open the newly created `.env` file and paste the following content. You **must** replace the placeholder values with your own, especially the Gmail App Password.

```dotenv
# backend/.env

# --- Server Configuration ---
PORT=5000
NODE_ENV=development

# --- Frontend URL for CORS ---
FRONTEND_URL=http://localhost:3000

# --- Gmail Credentials for Nodemailer ---
# IMPORTANT: You MUST use a 16-character App Password, not your regular password.
# Requires 2-Step Verification to be enabled on your Google Account.
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASS=your16characterpasswordnospaces

# --- Team Notification Email ---
# The email address that will receive the full application report.
TEAM_NOTIFICATION_EMAIL=p.touko@irembo.com
```

### 3. Configure the Frontend

In a **new Git Bash terminal**, navigate to the frontend directory and install its dependencies.

```bash
# Go into the frontend folder (from the project root)
cd frontend

# Install npm packages
npm install
```

---

## 🚀 Running the Application

You must have two terminals open to run both servers.

#### Terminal 1: Start the Backend

```bash
# Navigate to the backend directory
cd backend

# Start the development server using the nodemon script
npm run dev```
The server will start on port 5000 and confirm a successful connection to the email service.

#### Terminal 2: Start the Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Start the React development server
npm start
```
Your browser will automatically open to `http://localhost:3000`, where you can use the application.

---



## 🧪 Testing

The backend is configured with Jest for unit and integration testing.

```bash
# From the /backend directory:

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate a test coverage report
npm test -- --coverage
```
