// Import necessary packages
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config(); // Load environment variables from .env file

// Import our validation schema
const applicationSchema = require('./validation/application.schema');

// Initialize the Express app
const app = express();

// --- Middleware ---
// Enable CORS for all routes, allowing our frontend to connect
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- Swagger API Documentation Setup ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'RICA - Import Permit API',
      version: '1.0.0',
      description: 'API for submitting RICA import permit applications.',
      contact: {
        name: 'Aline NIYONIZERA',
        email: 'niyocroirealine@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development Server'
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/server.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
// Serve the interactive Swagger UI at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// --- API Route Definition ---

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Application submission endpoint
 */

/**
 * @swagger
 * /api/apply:
 *   post:
 *     summary: Submit a new import permit application
 *     tags: [Application]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicantCitizenship:
 *                 type: string
 *                 enum: [Rwandan, Foreigner]
 *               identificationDocumentNumber:
 *                 type: string
 *                 description: Required if applicant is Rwandan. Must be 16 digits.
 *               passportNumber:
 *                 type: string
 *                 description: Required if applicant is a Foreigner.
 *               otherNames:
 *                 type: string
 *               surname:
 *                 type: string
 *               nationality:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               businessOwnerAddress:
 *                 type: string
 *               businessType:
 *                 type: string
 *                 enum: [Retailer, Wholesale, Manufacturer]
 *               companyName:
 *                 type: string
 *               tinNumber:
 *                 type: string
 *                 description: Must be a 9-digit number.
 *               registrationDate:
 *                 type: string
 *                 format: date
 *               businessAddress:
 *                 type: string
 *               purposeOfImportation:
 *                 type: string
 *                 enum: ["Direct sale", "Personal use", "Trial use", "Other"]
 *               specifyPurpose:
 *                 type: string
 *                 description: Required if purposeOfImportation is "Other".
 *               productCategory:
 *                 type: string
 *                 enum: ["General purpose", "Construction materials", "Chemicals"]
 *               productName:
 *                 type: string
 *               weight:
 *                 type: number
 *                 description: Weight in kg.
 *               description:
 *                 type: string
 *               unitOfMeasurement:
 *                 type: string
 *                 enum: [Kgs, Tonnes]
 *               quantity:
 *                 type: number
 *                 description: Must be greater than 0.
 *     responses:
 *       200:
 *         description: Application submitted and email sent successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application submitted and email sent successfully!
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: \"tinNumber\" must be a 9-digit number."
 *       500:
 *         description: Internal server error (e.g., email failed to send).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error sending email.
 */
app.post('/api/apply', async (req, res) => {
    // 1. Validate the incoming request body
    const { error, value } = applicationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join('. ');
        return res.status(400).json({ message: `Validation error: ${errorMessage}` });
    }

    // 2. Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 3. Create rich HTML content for the email
    const emailHtml = `
      <h1>New RICA - Import Permit Application</h1>
      <h2>Company: ${value.companyName}</h2>
      <hr>
      <h3>Payload Details:</h3>
      <pre>${JSON.stringify(value, null, 2)}</pre>
    `;

    const mailOptions = {
        from: `"RICA Application System" <${process.env.EMAIL_USER}>`,
        to: 'p.touko@irembo.com',
        subject: `New Import Permit Application: ${value.companyName}`,
        html: emailHtml,
    };

    // 4. Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Application submitted and email sent successfully!' });
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        res.status(500).json({ message: 'Error sending email.' });
    }
});


// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
