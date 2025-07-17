// controllers/applicationController.js

const { v4: uuidv4 } = require("uuid");
const { sendConfirmationEmail, sendNotificationEmail } = require("../services/emailService");
const { saveApplication } = require("../services/applicationService");



const submitRICAApplication = async (req, res, next) => {
  try {
  
    const applicationData = req.body;
    const applicationId = `RICA-${Date.now()}-${uuidv4().substring(0, 6).toUpperCase()}`;

    const application = {
      id: applicationId,
      submissionDate: new Date().toISOString(),
      status: "Submitted",
      owner: {
        applicantCitizenship: applicationData.applicantCitizenship,
        identificationNumber: applicationData.identificationNumber || null,
        passportNumber: applicationData.passportNumber || null,
        otherNames: applicationData.otherNames,
        surname: applicationData.surname,
        nationality: applicationData.nationality,
        phone: {
          countryCode: applicationData.phoneCountryCode,
          number: applicationData.phoneNumber,
        },
        emailAddress: applicationData.emailAddress,
        address: {
          province: applicationData.ownerProvince,
          district: applicationData.ownerDistrict,
        }
      },
      business: {
        type: applicationData.businessType,
        companyName: applicationData.companyName,
        tin: applicationData.tinNumber,
        registrationDate: applicationData.registrationDate,
        address: {
          province: applicationData.businessProvince,
          district: applicationData.businessDistrict,
        }
      },
      product: {
        purpose: applicationData.purposeOfImportation,
        specifyPurpose: applicationData.specifyPurpose || null,
        category: applicationData.productCategory,
        name: applicationData.productName,
        weightKg: applicationData.weight,
        unitOfMeasurement: applicationData.unitOfMeasurement,
        quantity: applicationData.quantity,
        description: applicationData.description,
      },
      requestMeta: {
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
      }
    };

  
    await saveApplication(application);
   

    
    if (application.owner.emailAddress) {
      await sendConfirmationEmail(application);
    }
    await sendNotificationEmail(application);
   

    
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicationId: application.id,
        submissionDate: application.submissionDate,
        status: application.status,
      },
    });

  } catch (error) {
    console.error("[Controller] CRITICAL ERROR caught in controller:", error);
    next(error);
  }
};

module.exports = {
  submitRICAApplication,
};