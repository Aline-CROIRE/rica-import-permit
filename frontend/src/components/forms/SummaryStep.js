"use client"

import { useState, useEffect } from "react"
import FormSection from "./FormSection"
import "./SummaryStep.css"


import { getProvinces, getAllDistricts, getNationalities } from "../../services/api"


function SummaryStep({ formData }) {
  const [locationMaps, setLocationMaps] = useState({
    provinces: {},
    districts: {},
    nationalities: {},
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [provincesData, districtsData, nationalitiesData] = await Promise.all([
          getProvinces(),
        
          getAllDistricts(), 
          getNationalities(),
        ])
        
     
        const provinceMap = Object.fromEntries(provincesData.map((p) => [p.id, p.name]))
        const districtMap = Object.fromEntries(districtsData.map((d) => [d.id, d.name]))
        const nationalityMap = Object.fromEntries(nationalitiesData.map((n) => [n.id, n.name]))

        setLocationMaps({
          provinces: provinceMap,
          districts: districtMap,
          nationalities: nationalityMap,
        })
      } catch (error) {
        console.error("Error fetching look-up data for summary:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLookups()
  }, []) 

  if (isLoading) {
    return <p>Loading summary...</p>
  }

  return (
    <div className="summary-step">
      <h2 className="summary-title">Application Summary</h2>
      <p className="summary-description">Please review your application details before submission.</p>

      {/* --- Business Owner Details --- */}
      <FormSection title="Business Owner Details">
        <div className="summary-item">
          <strong>Applicant Citizenship:</strong> {formData.applicantCitizenship || "N/A"}
        </div>
        {formData.applicantCitizenship === "Rwandan" ? (
          <div className="summary-item">
            <strong>Identification document number:</strong> {formData.identificationNumber || "N/A"}
          </div>
        ) : (
          <div className="summary-item">
            <strong>Passport number:</strong> {formData.passportNumber || "N/A"}
          </div>
        )}
        <div className="summary-item">
          <strong>Other names:</strong> {formData.otherNames || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Surname:</strong> {formData.surname || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Nationality:</strong> {locationMaps.nationalities[formData.nationality] || formData.nationality || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Phone number:</strong> {formData.phoneCountryCode && formData.phoneNumber ? `${formData.phoneCountryCode} ${formData.phoneNumber}` : "N/A"}
        </div>
        <div className="summary-item">
          <strong>E-mail address:</strong> {formData.emailAddress || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Province:</strong> {locationMaps.provinces[formData.ownerProvince] || formData.ownerProvince || "N/A"}
        </div>
        <div className="summary-item">
          <strong>District:</strong> {locationMaps.districts[formData.ownerDistrict] || formData.ownerDistrict || "N/A"}
        </div>
      </FormSection>


      {/* --- Business Details --- */}
      <FormSection title="Business Details">
        <div className="summary-item">
          <strong>Business type:</strong> {formData.businessType || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Company name:</strong> {formData.companyName || "N/A"}
        </div>
        <div className="summary-item">
          <strong>TIN number:</strong> {formData.tinNumber || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Registration date:</strong> {formData.registrationDate ? new Date(formData.registrationDate).toLocaleDateString() : "N/A"}
        </div>
        <div className="summary-item">
          <strong>Province:</strong> {locationMaps.provinces[formData.businessProvince] || formData.businessProvince || "N/A"}
        </div>
        <div className="summary-item">
          <strong>District:</strong> {locationMaps.districts[formData.businessDistrict] || formData.businessDistrict || "N/A"}
        </div>
      </FormSection>


      {/* --- Product Information --- */}
      <FormSection title="Product Information">
        <div className="summary-item">
          <strong>Purpose of Importation:</strong> {formData.purposeOfImportation || "N/A"}
        </div>
        {formData.purposeOfImportation === "Other" && (
          <div className="summary-item">
            <strong>Specify Purpose:</strong> {formData.specifyPurpose || "N/A"}
          </div>
        )}
        <div className="summary-item">
          <strong>Product Category:</strong> {formData.productCategory || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Product Name:</strong> {formData.productName || "N/A"}
        </div>
        <div className="summary-item">
          <strong>Weight:</strong> {formData.weight ? `${formData.weight} ${formData.unitOfMeasurement}` : "N/A"}
        </div>
        <div className="summary-item">
          <strong>Quantity:</strong> {formData.quantity || "N/A"}
        </div>
        <div className="summary-item-vertical">
          <strong>Description:</strong>
          <div className="summary-item-content">
            {formData.description || "N/A"}
          </div>
        </div>
      </FormSection>


      <div className="submission-confirmation">
        <input type="checkbox" id="confirmSubmission" name="confirmSubmission" required />
        <label htmlFor="confirmSubmission">
          By clicking 'Submit Application', I confirm that all the information provided is accurate and true to the best of my knowledge.
        </label>
      </div>
    </div>
  )
}

export default SummaryStep