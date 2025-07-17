import "./StepIndicator.css"

function StepIndicator({ steps, currentStep }) {
  const indicatorSteps = Array.isArray(steps) ? steps : []

  return (
    <div className="step-indicator no-print">
      {indicatorSteps.map((step, index) => (
        <div key={index} className={`step-item ${index <= currentStep ? "active" : ""}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
