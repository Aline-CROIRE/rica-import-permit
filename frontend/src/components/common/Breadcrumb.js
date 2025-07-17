import "./Breadcrumb.css"

function Breadcrumb({ steps, currentStep }) {
  
  const breadcrumbSteps = Array.isArray(steps) ? steps : []

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbSteps.map((step, index) => (
          <li key={index} className={`breadcrumb-item ${index === currentStep ? "active" : ""}`}>
            {step}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
