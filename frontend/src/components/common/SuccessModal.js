"use client"

import "./SuccessModal.css"

function SuccessModal({ isOpen, onClose, applicationId, submissionDate }) {
  if (!isOpen) return null

  const nextSteps = [
    "Your application will be reviewed within 5-7 business days.",
    "You'll receive email updates on your application status.",
    "Additional documents may be requested if needed.",
    "Approved permits will be sent via email.",
  ]

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="check-icon">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="modal-title">Your application has been submitted successfully!</h2>
        </div>
        <div className="modal-body">
          <p>
            <strong>Application ID:</strong> {applicationId}
          </p>
          <p>
            <strong>Submission Date:</strong> {new Date(submissionDate).toLocaleString()}
          </p>

          <h3 className="what-next-title">What's Next:</h3>
          <ul className="next-steps-list">
            {nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <p className="contact-info">For any questions, please contact Irembo Support.</p>
          <p className="contact-info">Phone: +250 788 123 456</p>
          <p className="contact-info">Email: support@irembo.gov.rw</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
