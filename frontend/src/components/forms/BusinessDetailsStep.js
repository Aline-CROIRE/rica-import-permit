"use client"

import { useState, useEffect, useCallback } from "react"
import { useController } from "react-hook-form"
import { Briefcase } from "lucide-react"
import FormSection from "./FormSection"
import { getProvinces, getDistricts } from "../../services/api"


function BusinessDetailsStep({ control, errors, watch, setValue }) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])

  const selectedProvince = watch("businessProvince")

  // --- Form Field Controllers (react-hook-form) ---

  const { field: businessTypeField } = useController({
    name: "businessType",
    control,
    rules: { required: "This field is required" },
  })

  const { field: companyNameField } = useController({
    name: "companyName",
    control,
    rules: { required: "This field is required" },
  })

  const { field: tinNumberField } = useController({
    name: "tinNumber",
    control,
    rules: {
      required: "This field is required",
      pattern: {
        value: /^\d{9}$/,
        message: "Please provide a valid 9-digit TIN number",
      },
    },
  })

  const { field: registrationDateField } = useController({
    name: "registrationDate",
    control,
    rules: {
      required: "This field is required",
      validate: (value) => {
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate <= today || "Registration Date cannot be in the future."
      },
    },
  })

  const { field: businessProvinceField } = useController({ name: "businessProvince", control, rules: { required: "This field is required" } })
  const { field: businessDistrictField } = useController({
    name: "businessDistrict",
    control,
    rules: { required: "This field is required" },
  })
  
  // --- Data Fetching Callbacks ---

  const fetchProvinces = useCallback(async () => {
    try {
      const provincesData = await getProvinces()
      setProvinces(provincesData)
    } catch (error) {
      console.error("Error fetching provinces:", error)
    }
  }, [])

  const fetchDistrictsForProvince = useCallback(async (provinceId) => {
    try {
      const districtsData = await getDistricts(provinceId)
      setDistricts(districtsData)
    } catch (error) {
      console.error("Error fetching districts:", error)
    }
  }, [])

  // --- useEffect Hooks ---

  useEffect(() => {
    fetchProvinces()
  }, [fetchProvinces])

  useEffect(() => {
    setDistricts([])
    setValue("businessDistrict", "")
    if (selectedProvince) {
      fetchDistrictsForProvince(selectedProvince)
    }
  }, [selectedProvince, fetchDistrictsForProvince, setValue])

  // Helper to get today's date in YYYY-MM-DD format for the input's max attribute
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <FormSection title="Business Details" icon={Briefcase}>
      <h3 className="form-sub-section-heading">Business Details</h3>
      
      <div className="form-group">
        <label htmlFor="businessType">Business type <span className="required">*</span></label>
        <select id="businessType" {...businessTypeField} className="form-select">
          <option value="">Enter Business Type</option>
          <option value="Retailer">Retailer</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Manufacturer">Manufacturer</option>
        </select>
        {errors.businessType && <p className="error-message">{errors.businessType.message}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="companyName">Company name <span className="required">*</span></label>
        <input
          type="text"
          id="companyName"
          {...companyNameField}
          className="form-input"
          placeholder="Enter company name"
        />
        {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="tinNumber">TIN number <span className="required">*</span></label>
          <input
            type="text"
            id="tinNumber"
            {...tinNumberField}
            className="form-input"
            placeholder="Enter TIN number"
            maxLength="9"
          />
          {errors.tinNumber && <p className="error-message">{errors.tinNumber.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="registrationDate">Registration date <span className="required">*</span></label>
          <input
            type="date"
            id="registrationDate"
            {...registrationDateField}
            className="form-input"
            placeholder="Select date"
            // THE FIX: This prevents users from selecting a future date in the browser.
            max={getTodayString()}
          />
          {errors.registrationDate && <p className="error-message">{errors.registrationDate.message}</p>}
        </div>
      </div>

      <h3 className="form-sub-section-heading">Business Address</h3>
      <div className="form-group">
        <label htmlFor="businessProvince">Province <span className="required">*</span></label>
        <select id="businessProvince" {...businessProvinceField} className="form-select">
          <option value="">Select province</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.businessProvince && <p className="error-message">{errors.businessProvince.message}</p>}
      </div>

      {selectedProvince && (
        <div className="form-group">
          <label htmlFor="businessDistrict">District <span className="required">*</span></label>
          <select 
            id="businessDistrict" 
            {...businessDistrictField} 
            className="form-select"
            disabled={districts.length === 0}
          >
            <option value="">Enter district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.businessDistrict && <p className="error-message">{errors.businessDistrict.message}</p>}
        </div>
      )}
    </FormSection>
  )
}

export default BusinessDetailsStep