# rica-import-permit# RICA Import Permit Application

This is a multi-step form application designed to facilitate the submission of RICA Import Permit applications. It features a user-friendly interface for collecting business owner details, business information, and product details, with robust validation and a clear summary step. The application is built with a React frontend and a Node.js/Express backend.

## ✨ Features

*   **Multi-Step Form:** Guides users through the application process with clear steps.
*   **Conditional Fields:** Dynamically displays fields (e.g., ID/Passport, Nationality, Specify Purpose) based on previous selections.
*   **Dynamic Location Dropdowns:**
    *   **Business Owner Address:** Simplified to only require District selection.
    *   **Business Address:** Provides cascading dropdowns for Province, District, Sector, and Cell.
*   **Client-Side Validation:** Real-time form validation using `react-hook-form`.
*   **Server-Side Validation:** Robust data validation using Joi on the backend.
*   **API Integration:** Communicates with a Node.js/Express backend for form submission and fetching location data.
*   **Success & Error Handling:** Provides clear feedback to the user upon submission or error.
*   **Responsive Design:** Optimized for various screen sizes.

## 🚀 Technologies Used

### Frontend (React)

*   **React:** A JavaScript library for building user interfaces.
*   **React Router DOM:** For declarative routing in React applications.
*   **React Hook Form:** For efficient and flexible form management with validation.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **Lucide React:** A collection of beautiful and customizable open-source icons.
*   **CSS:** Custom styling for a clean and modern look.

### Backend (Node.js/Express)

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Joi:** A powerful schema description language and data validator for JavaScript.
*   **Nodemailer:** A module for Node.js applications to send emails.
*   **UUID:** For generating unique IDs.
*   **CORS:** Middleware to enable Cross-Origin Resource Sharing.
*   **Helmet:** Helps secure Express apps by setting various HTTP headers.
*   **Express Rate Limit:** Basic rate-limiting middleware to protect against brute-force attacks.
*   **Morgan:** HTTP request logger middleware.
*   **Swagger UI Express & Swagger JSDoc:** For generating and serving API documentation.

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v16.0.0 or higher)
*   npm (v8.0.0 or higher) or Yarn

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone <repository-url>
    cd rica-import-permit-application # Or whatever your project folder is named
    \`\`\`
    *(Note: If you received this code directly from v0, you might just have the files. In that case, create a new project folder and place the `frontend` and `backend` directories inside it.)*

2.  **Install Frontend Dependencies:**
    \`\`\`bash
    cd frontend
    npm install # or yarn install
    \`\`\`

3.  **Install Backend Dependencies:**
    \`\`\`bash
    cd ../backend
    npm install # or yarn install
    \`\`\`

### Running Locally

#### 1. Backend Setup

1.  **Create a `.env` file:** In the `backend` directory, create a file named `.env` and copy the contents from `.env.example` into it.
    \`\`\`bash
    cp .env.example .env
    \`\`\`
2.  **Configure Environment Variables:**
    *   `PORT`: The port your backend server will run on (e.g., `5000`).
    *   `FRONTEND_URL`: The URL of your frontend application (e.g., `http://localhost:3000`).
    *   **SMTP Configuration (for emails):** If you want to test email functionality, configure these. Otherwise, emails will be logged to the console.
        *   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
        *   `APPLICATION_EMAIL`: The email address from which application notifications will be sent.
    *   `NODE_ENV`: Set to `development` for local development.

3.  **Start the Backend Server:**
    \`\`\`bash
    npm run dev # or yarn dev
    \`\`\`
    The backend server will start on `http://localhost:5000` (or your specified PORT). You can access API documentation at `http://localhost:5000/api-docs`.

#### 2. Frontend Setup

1.  **Create a `.env` file:** In the `frontend` directory, create a file named `.env` and copy the contents from `.env.example` into it.
    \`\`\`bash
    cp .env.example .env
    \`\`\`
2.  **Configure Environment Variables:**
    *   `REACT_APP_API_URL`: Set this to your backend API URL (e.g., `http://localhost:5000/api`).

3.  **Start the Frontend Application:**
    \`\`\`bash
    npm start # or yarn start
    \`\`\`
    The frontend application will open in your browser at `http://localhost:3000`.

## 🌐 API Endpoints

The backend provides the following key API endpoints:

*   **`POST /api/applications/rica-import-permit`**: Submits a new RICA Import Permit application.
*   **`GET /api/locations/provinces`**: Retrieves a list of all provinces in Rwanda.
*   **`GET /api/locations/districts/{provinceId}`**: Retrieves districts for a specific province.
*   **`GET /api/locations/all-districts`**: Retrieves a flattened list of all districts in Rwanda.
*   **`GET /api/locations/sectors/{districtId}`**: Retrieves sectors for a specific district.
*   **`GET /api/locations/cells/{sectorId}`**: Retrieves cells for a specific sector.
*   **`GET /api/health`**: Health check endpoint for the API.

For detailed API documentation, visit `/api-docs` when the backend server is running.

## 🚀 Deployment on Vercel

This project consists of a frontend React application and a backend Node.js/Express API. For deployment on Vercel, it's recommended to deploy them as separate projects.

### 1. Deploying the Frontend (React App)

1.  **Initialize Git:** If you haven't already, initialize a Git repository in your project's root directory and commit your code.
    \`\`\`bash
    git init
    git add .
    git commit -m "Initial commit"
    \`\`\`
2.  **Create a GitHub Repository:** Create a new empty repository on GitHub (or GitLab/Bitbucket) and push your local code to it.
    \`\`\`bash
    git remote add origin <your-repository-url>
    git branch -M main
    git push -u origin main
    \`\`\`
3.  **Import Project to Vercel:**
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Select your Git provider and import the repository you just created.
4.  **Configure Project:**
    *   **Root Directory:** When prompted, ensure the "Root Directory" is set to `frontend/`. This tells Vercel to build only the React app.
    *   **Build & Output Settings:** Vercel should auto-detect React and configure `npm run build` for the build command and `build` for the output directory.
    *   **Environment Variables:** Add the `REACT_APP_API_URL` environment variable. Initially, you might set this to a placeholder or your local backend URL if you're testing. Once your backend is deployed, you'll update this to the live backend API URL.
        *   `REACT_APP_API_URL`: `https://your-backend-api-url.vercel.app/api` (replace with your actual backend URL after deployment)
5.  **Deploy:** Click "Deploy". Vercel will build and deploy your React application.

### 2. Deploying the Backend (Node.js/Express API as Serverless Functions)

To deploy your Node.js Express backend on Vercel, you'll need to adapt it slightly to fit Vercel's Serverless Functions model. This involves creating an `api` directory and exporting your Express app.

1.  **Adapt Backend for Serverless:**
    *   Inside your `backend` directory, create a new folder named `api`.
    *   Inside `backend/api/`, create a file named `index.js`.
    *   Move the core Express app setup from `backend/server.js` into `backend/api/index.js`.
    *   Modify `backend/api/index.js` to export the Express app instance.

    **`backend/api/index.js` (New File):**
    \`\`\`javascript
    const express = require("express");
    const cors = require("cors");
    const helmet = require("helmet");
    const rateLimit = require("express-rate-limit");
    const morgan = require("morgan");
    require("dotenv").config(); // Load environment variables

    const app = express();

    // --- Middleware ---
    app.use(helmet());
    app.use(cors({
      origin: process.env.FRONTEND_URL || "*", // Allow requests from your frontend or all origins
      credentials: true,
    }));

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: { success: false, message: "Too many requests from this IP, please try again later." },
    });
    app.use("/api", limiter);

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));

    // --- Import Routes ---
    const applicationRoutes = require("../src/routes/applicationRoutes");
    const locationRoutes = require("../src/routes/locationRoutes");

    // --- Application Routes ---
    app.use("/api/applications", applicationRoutes);
    app.use("/api/locations", locationRoutes);

    // --- Health Check Endpoint ---
    app.get("/api/health", (req, res) => {
      res.json({
        success: true,
        message: "RICA Import Permit API is running",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      });
    });

    // --- Error Handling Middleware ---
    const { notFound, errorHandler } = require("../src/middleware/errorHandler");
    app.use(notFound);
    app.use(errorHandler);

    // Export the Express app for Vercel Serverless Functions
    module.exports = app;
    \`\`\`
    *   You can now delete or rename `backend/server.js` as its content has been moved.

2.  **Commit Changes:** Commit these changes to your Git repository.
    \`\`\`bash
    git add backend/api/index.js
    git commit -m "Adapt backend for Vercel Serverless Functions"
    git push
    \`\`\`

3.  **Import Backend Project to Vercel:**
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click "Add New..." -> "Project".
    *   Select your Git provider and import the *same* repository.
4.  **Configure Project:**
    *   **Root Directory:** Set the "Root Directory" to `backend/`. This tells Vercel to deploy the Node.js API.
    *   **Build & Output Settings:** Vercel should auto-detect Node.js. No specific build command is needed if your `package.json` is in `backend/` and your serverless function is in `backend/api/index.js`.
    *   **Environment Variables:** Add all necessary backend environment variables from your `backend/.env` file to Vercel.
        *   `PORT` (optional, Vercel assigns one)
        *   `FRONTEND_URL`: Set this to the deployed URL of your frontend application (e.g., `https://your-frontend-app.vercel.app`).
        *   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `APPLICATION_EMAIL` (if using email functionality).
        *   `NODE_ENV`: Set to `production`.
5.  **Deploy:** Click "Deploy". Vercel will deploy your backend as serverless functions.

### 3. Update Frontend API URL

Once your backend is successfully deployed on Vercel, copy its URL (e.g., `https://your-backend-api-url.vercel.app`).

1.  Go back to your frontend project settings in the Vercel Dashboard.
2.  Navigate to "Settings" -> "Environment Variables".
3.  Edit the `REACT_APP_API_URL` variable and set its value to your deployed backend URL, followed by `/api` (e.g., `https://your-backend-api-url.vercel.app/api`).
4.  **Redeploy Frontend:** After updating the environment variable, redeploy your frontend application for the changes to take effect.

Your full-stack RICA Import Permit application should now be live on Vercel!
