// middleware/errorHandler.js

const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const response = {
    success: false,
    message: err.message || "An unexpected server error occurred.",
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.json(response);
};

module.exports = {
  errorHandler,
  notFound,
};