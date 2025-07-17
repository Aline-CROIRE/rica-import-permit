// server.js

require("dotenv").config();
require("express-async-errors"); 

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./src/middleware/errorHandler");
const applicationRoutes = require("./src/routes/applicationRoutes");
const locationRoutes = require("./src/routes/locationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors()); 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes." },
});
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.send("RICA API is running...");
});

app.use("/api/applications", applicationRoutes);
app.use("/api/locations", locationRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Listening on PORT: ${PORT}`);
});

module.exports = app;