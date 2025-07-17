const Joi = require('joi');

const applicationSchema = Joi.object({
    applicantCitizenship: Joi.string().valid('Rwandan', 'Foreigner').required(),
    identificationDocumentNumber: Joi.string().when('applicantCitizenship', {
        is: 'Rwandan',
        then: Joi.string().length(16).required().messages({ 'string.length': 'ID number must be 16 digits' }),
        otherwise: Joi.optional().allow('')
    }),
    passportNumber: Joi.string().when('applicantCitizenship', {
        is: 'Foreigner',
        then: Joi.string().required(),
        otherwise: Joi.optional().allow('')
    }),
    otherNames: Joi.string().required(),
    surname: Joi.string().required(),
    nationality: Joi.string().required(),
    phone: Joi.string().optional().allow(''),
    email: Joi.string().email({ tlds: { allow: false } }).optional().allow(''),
    businessOwnerAddress: Joi.string().required(),
    businessType: Joi.string().valid('Retailer', 'Wholesale', 'Manufacturer').required(),
    companyName: Joi.string().required(),
    tinNumber: Joi.string().length(9).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'Please provide a valid TIN number (9 digits)',
        'string.pattern.base': 'TIN number must only contain digits'
    }),
    registrationDate: Joi.date().iso().required(),
    businessAddress: Joi.string().required(),
    purposeOfImportation: Joi.string().valid('Direct sale', 'Personal use', 'Trial use', 'Other').required(),
    specifyPurpose: Joi.string().when('purposeOfImportation', {
        is: 'Other',
        then: Joi.string().required(),
        otherwise: Joi.optional().allow('')
    }),
    productCategory: Joi.string().valid('General purpose', 'Construction materials', 'Chemicals').required(),
    productName: Joi.string().required(),
    weight: Joi.number().optional().allow(''),
    description: Joi.string().required(),
    unitOfMeasurement: Joi.string().valid('Kgs', 'Tonnes').required(),
    quantity: Joi.number().greater(0).required().messages({
      'number.greater': 'Please provide a number greater than zero'
    })
});

module.exports = applicationSchema;