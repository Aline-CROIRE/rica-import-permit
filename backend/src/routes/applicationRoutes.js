// routes/applicationRoutes.js

const express = require("express");
const { submitRICAApplication } = require("../controllers/applicationController");
const { validateRICAApplication } = require("../middleware/validation");

const router = express.Router();

router.post(
  "/rica-import-permit",
  validateRICAApplication,
  submitRICAApplication
);

module.exports = router;