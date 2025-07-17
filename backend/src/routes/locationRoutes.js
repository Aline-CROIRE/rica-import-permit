// routes/locationRoutes.js

const express = require("express");
const { 
  getProvinces, 
  getDistricts, 
  getAllDistricts, 
  getNationalities, 
  getCountryCodes 
} = require("../controllers/locationController");

const router = express.Router();

router.get("/provinces", getProvinces);

router.get("/districts/all", getAllDistricts);

router.get("/districts/:provinceId", getDistricts);

router.get("/nationalities", getNationalities);

router.get("/country-codes", getCountryCodes);

module.exports = router;