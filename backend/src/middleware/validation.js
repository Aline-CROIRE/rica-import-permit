// middleware/validationMiddleware.js

const Joi = require("joi");

const customDateValidation = (value, helpers) => {
  const inputDate = new Date(value);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (inputDate > today) {
    return helpers.error("date.future");
  }
  return value;
};

const ricaApplicationSchema = Joi.object({
  applicantCitizenship: Joi.string().valid("Rwandan", "Foreigner").required().messages({
    "any.required": "Applicant citizenship is required.",
  }),
  identificationNumber: Joi.when("applicantCitizenship", {
    is: "Rwandan",
    then: Joi.string().pattern(/^\d{16}$/).required().messages({
      "any.required": "Identification number is required for Rwandan citizens.",
      "string.pattern.base": "ID number must be 16 digits.",
    }),
    otherwise: Joi.string().optional().allow("", null),
  }),
  passportNumber: Joi.when("applicantCitizenship", {
    is: "Foreigner",
    then: Joi.string().required().messages({
      "any.required": "Passport number is required for foreigners.",
    }),
    otherwise: Joi.string().optional().allow("", null),
  }),
  otherNames: Joi.string().min(2).max(100).required().messages({
    "any.required": "Other names are required.",
  }),
  surname: Joi.string().min(2).max(100).required().messages({
    "any.required": "Surname is required.",
  }),
  nationality: Joi.when("applicantCitizenship", {
    is: "Foreigner",
    then: Joi.string().required().messages({ "any.required": "Nationality is required for foreigners." }),
    otherwise: Joi.string().optional().allow("", null),
  }),
  phoneCountryCode: Joi.string().pattern(/^\+.*/).optional().allow('', null).messages({
    "string.pattern.base": "Country code must start with a '+'.",
  }),
  phoneNumber: Joi.string().pattern(/^\d{5,15}$/).optional().allow("", null).messages({
    "string.pattern.base": "Phone number must contain only 5 to 15 digits.",
  }),
  emailAddress: Joi.string().email().optional().allow("", null).messages({
    "string.email": "A valid email address must be provided.",
  }),
  ownerProvince: Joi.string().required().messages({
    "any.required": "Owner's province is required.",
  }),
  ownerDistrict: Joi.string().required().messages({
    "any.required": "Owner's district is required.",
  }),

  businessType: Joi.string().valid("Retailer", "Wholesale", "Manufacturer").required(),
  companyName: Joi.string().min(2).max(200).required(),
  tinNumber: Joi.string().pattern(/^\d{9}$/).required().messages({
    "string.pattern.base": "Please provide a valid 9-digit TIN number.",
  }),
  registrationDate: Joi.date().custom(customDateValidation).required().messages({
    "any.required": "Registration date is required.",
    "date.future": "Registration date cannot be in the future.",
  }),
  businessProvince: Joi.string().required(),
  businessDistrict: Joi.string().required(),

  purposeOfImportation: Joi.string().valid("Direct sale", "Personal use", "Trial use", "Other").required(),
  specifyPurpose: Joi.when("purposeOfImportation", {
    is: "Other",
    then: Joi.string().required().messages({ "any.required": "Please specify the purpose." }),
    otherwise: Joi.string().optional().allow("", null),
  }),
  productCategory: Joi.string().valid("General purpose", "Construction materials", "Chemicals").required(),
  productName: Joi.string().min(2).max(200).required(),
  weight: Joi.number().min(0.01).required().messages({ "number.min": "Weight must be greater than 0." }),
  description: Joi.string().min(10).max(1000).required(),
  unitOfMeasurement: Joi.string().valid("Kgs", "Tonnes").required(),
  quantity: Joi.number().integer().min(1).required().messages({ "number.min": "Quantity must be at least 1." }),

  ownerSector: Joi.any().optional(),
  ownerCell: Joi.any().optional(),
  businessSector: Joi.any().optional(),
  businessCell: Joi.any().optional(),

}).unknown(false);


const validateRICAApplication = (req, res, next) => {
  try {
    const { error } = ricaApplicationSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      return res.status(400).json({
        success: false,
        message: "Validation error. Please check the provided data.",
        errors,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateRICAApplication,
};