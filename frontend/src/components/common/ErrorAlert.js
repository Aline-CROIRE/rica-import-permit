"use client"

import "./ErrorAlert.css"

function ErrorAlert({ message, onClose }) {
  if (!message) return null

  return (
    <div className="error-alert" role="alert">
      <div className="error-icon">!</div>
      <div className="error-content">
        <h3 className="error-title">Error</h3>
        <p className="error-message">{message}</p>
      </div>
      {onClose && (
        <button className="error-close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  )
}

export default ErrorAlert
