// services/emailService.js

const nodemailer = require("nodemailer");
require("dotenv").config();
const { rwandaLocations } = require("../data/locations");

const provinceMap = Object.fromEntries(rwandaLocations.provinces.map(p => [p.id, p.name]));
const districtMap = Object.fromEntries(rwandaLocations.districts.map(d => [d.id, d.name]));
const nationalityMap = Object.fromEntries(rwandaLocations.nationalities.map(n => [n.id, n.name]));

const gmailUser = process.env.GMAIL_USER;
const gmailAppPass = process.env.GMAIL_APP_PASS;

if (!gmailUser || !gmailAppPass) {
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: gmailUser, pass: gmailAppPass },
});

transporter.verify((error) => {
  if (error) {
    process.exit(1);
  }
});

const generateConfirmationHtml = (application) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #0056b3;">RICA Import Permit Application Confirmation</h2>
      <p>Dear ${application.owner.otherNames} ${application.owner.surname},</p>
      <p>Your application for a RICA Import Permit has been successfully submitted. Please keep the details below for your records.</p>
      <hr style="border: 0; border-top: 1px solid #eee;">
      <h3 style="color: #0056b3;">Application Summary</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;"><strong>Application ID:</strong> ${application.id}</li>
        <li style="margin-bottom: 10px;"><strong>Submission Date:</strong> ${new Date(application.submissionDate).toLocaleString()}</li>
        <li style="margin-bottom: 10px;"><strong>Company Name:</strong> ${application.business.companyName}</li>
        <li style="margin-bottom: 10px;"><strong>Product Name:</strong> ${application.product.name}</li>
      </ul>
      <h3 style="color: #0056b3;">What's Next?</h3>
      <p>Our team will now review your application. This process typically takes 5-7 business days. You will receive another email from us once a decision has been made.</p>
      <p>Thank you for using the Irembo service.</p>
      <p style="margin-top: 20px;">Best regards,<br><strong>The Irembo Team</strong></p>
    </div>
  `;
};

const generateNotificationHtml = (application) => {
  const { owner, business, product } = application;
  const display = (value) => value || '<i style="color: #888;">Not Provided</i>';

  const ownerNationalityName = nationalityMap[owner.nationality] || owner.nationality;
  const ownerProvinceName = provinceMap[owner.address.province] || owner.address.province;
  const ownerDistrictName = districtMap[owner.address.district] || owner.address.district;
  const businessProvinceName = provinceMap[business.address.province] || business.address.province;
  const businessDistrictName = districtMap[business.address.district] || business.address.district;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: auto;">
      <h2 style="color: #d9534f; border-bottom: 2px solid #d9534f; padding-bottom: 10px;">New RICA Import Permit Application for Review</h2>
      <p>A new application has been submitted and requires your attention.</p>
      
      <h3 style="color: #0056b3; margin-top: 25px;">Business Owner Details</h3>
      <table cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <tr style="background-color: #f9f9f9;"><td style="width: 200px; font-weight: bold;">Application ID:</td><td>${application.id}</td></tr>
        <tr><td style="font-weight: bold;">Citizenship:</td><td>${owner.applicantCitizenship}</td></tr>
        ${owner.applicantCitizenship === 'Rwandan'
          ? `<tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">National ID:</td><td>${display(owner.identificationNumber)}</td></tr>`
          : `<tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Passport Number:</td><td>${display(owner.passportNumber)}</td></tr>`
        }
        <tr><td style="font-weight: bold;">Full Name:</td><td>${owner.otherNames} ${owner.surname}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Nationality:</td><td>${display(ownerNationalityName)}</td></tr>
        <tr><td style="font-weight: bold;">Email:</td><td>${display(owner.emailAddress)}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Phone:</td><td>${display(owner.phone.countryCode)} ${display(owner.phone.number)}</td></tr>
        <tr><td style="font-weight: bold;">Owner Address:</td><td>${display(ownerDistrictName)}, ${display(ownerProvinceName)}</td></tr>
      </table>

      <h3 style="color: #0056b3; margin-top: 25px;">Business Details</h3>
      <table cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <tr style="background-color: #f9f9f9;"><td style="width: 200px; font-weight: bold;">Business Type:</td><td>${business.type}</td></tr>
        <tr><td style="font-weight: bold;">Company Name:</td><td>${business.companyName}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">TIN Number:</td><td>${business.tin}</td></tr>
        <tr><td style="font-weight: bold;">Registration Date:</td><td>${new Date(business.registrationDate).toLocaleDateString()}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Business Address:</td><td>${display(businessDistrictName)}, ${display(businessProvinceName)}</td></tr>
      </table>

      <h3 style="color: #0056b3; margin-top: 25px;">Product Information</h3>
      <table cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <tr style="background-color: #f9f9f9;"><td style="width: 200px; font-weight: bold;">Purpose of Importation:</td><td>${product.purpose}</td></tr>
        ${product.purpose === 'Other'
          ? `<tr><td style="font-weight: bold;">Specified Purpose:</td><td>${display(product.specifyPurpose)}</td></tr>`
          : ''
        }
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Product Category:</td><td>${product.category}</td></tr>
        <tr><td style="font-weight: bold;">Product Name:</td><td>${product.name}</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;">Weight:</td><td>${product.weightKg} ${product.unitOfMeasurement}</td></tr>
        <tr><td style="font-weight: bold;">Quantity:</td><td>${product.quantity} units</td></tr>
        <tr style="background-color: #f9f9f9;"><td style="font-weight: bold;" colspan="2">Description:</td></tr>
        <tr><td colspan="2" style="padding-top: 5px;">${product.description}</td></tr>
      </table>
      
      <p style="margin-top: 25px; text-align: center; font-size: 12px; color: #888;">This is an automated notification from the Irembo Platform.</p>
    </div>
  `;
};

const sendConfirmationEmail = async (application) => {
  try {
    const recipientEmail = application.owner.emailAddress;
    if (!recipientEmail) return;

    const textContent = `Dear ${application.owner.otherNames}, Your RICA application (ID: ${application.id}) has been submitted. Thank you, The Irembo Team`;
    
    await transporter.sendMail({
      from: `"Irembo RICA Service" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject: `Application Confirmation: ${application.id}`,
      text: textContent,
      html: generateConfirmationHtml(application),
    });
  } catch (error) {
   
  }
};

const sendNotificationEmail = async (application) => {
  try {
    const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL || process.env.GMAIL_USER;
    if (!teamEmail) return;
    
    const textContent = `New RICA application for review. ID: ${application.id}, Applicant: ${application.owner.otherNames} ${application.owner.surname}.`;

    await transporter.sendMail({
      from: `"Irembo Platform Notification" <${process.env.GMAIL_USER}>`,
      to: teamEmail,
      subject: `New Application Received: ${application.id}`,
      text: textContent,
      html: generateNotificationHtml(application),
    });
  } catch (error) {
    
  }
};

module.exports = {
  sendConfirmationEmail,
  sendNotificationEmail,
};