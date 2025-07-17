import "./FormSection.css"

function FormSection({ title, icon: Icon, children }) {
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        {Icon && <Icon className="form-section-icon" />}
        {title}
      </h2>
      <div className="form-section-content">{children}</div>
    </div>
  )
}

function FormSubSectionHeader({ title }) {
  return <h3 className="form-sub-section-title">{title}</h3>
}

export { FormSubSectionHeader }
export default FormSection
