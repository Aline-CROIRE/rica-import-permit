// controllers/locationController.js

const { rwandaLocations } = require("../data/locations");

const getProvinces = async (req, res) => {
  res.json({
    success: true,
    data: rwandaLocations.provinces,
  });
};

const getDistricts = async (req, res) => {
  const { provinceId } = req.params;
  const districts = rwandaLocations.districts.filter(
    (district) => district.provinceId === provinceId
  );

  res.json({
    success: true,
    data: districts,
  });
};

const getAllDistricts = async (req, res) => {
  res.json({
    success: true,
    data: rwandaLocations.districts,
  });
};

const getNationalities = async (req, res) => {
  res.json({
    success: true,
    data: rwandaLocations.nationalities,
  });
};

const getCountryCodes = async (req, res) => {
  res.json({
    success: true,
    data: rwandaLocations.countryCallingCodes,
  });
};

module.exports = {
  getProvinces,
  getDistricts,
  getAllDistricts,
  getNationalities,
  getCountryCodes,
};