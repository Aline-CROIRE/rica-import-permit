"use client"

import { useState, useEffect, useCallback } from "react"
import { useController } from "react-hook-form"
import { User } from "lucide-react"
import FormSection from "./FormSection"
import { getProvinces, getDistricts, getNationalities, getCountryCodes } from "../../services/api"

function BusinessOwnerDetailsStep({ control, errors, watch, setValue }) {
  
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [nationalities, setNationalities] = useState([])
  const [countryCodes, setCountryCodes] = useState([])

  const applicantCitizenship = watch("applicantCitizenship")
  const selectedProvince = watch("ownerProvince")


  const { field: applicantCitizenshipField } = useController({
    name: "applicantCitizenship",
    control,
    rules: { required: "This field is required" },
  })

  const { field: identificationNumberField } = useController({
    name: "identificationNumber",
    control,
    rules: {
      validate: (value) => {
        if (watch("applicantCitizenship") === "Rwandan") {
          if (!value) return "This field is required"
          if (!/^\d{16}$/.test(value)) return "ID number must be 16 digits"
        }
        return true
      },
    },
  })

  const { field: passportNumberField } = useController({
    name: "passportNumber",
    control,
    rules: {
      validate: (value) => {
        if (watch("applicantCitizenship") === "Foreigner" && !value) {
          return "This field is required"
        }
        return true
      },
    },
  })

  const { field: otherNamesField } = useController({
    name: "otherNames",
    control,
    rules: { required: "This field is required" },
  })

  const { field: surnameField } = useController({
    name: "surname",
    control,
    rules: { required: "This field is required" },
  })

  const { field: nationalityField } = useController({
    name: "nationality",
    control,
    rules: { required: "This field is required" },
  })

  const { field: phoneCountryCodeField } = useController({
    name: "phoneCountryCode",
    control,
    defaultValue: "+250",
  })

  const { field: phoneNumberField } = useController({
    name: "phoneNumber",
    control,
    
    rules: {
      pattern: {
        value: /^\d{5,15}$/,
        message: "Please enter a valid phone number (digits only).",
      },
    },
  })

  const { field: emailAddressField } = useController({
    name: "emailAddress",
    control,
    rules: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address format.",
      },
    },
  })

  const { field: ownerProvinceField } = useController({
    name: "ownerProvince",
    control,
    rules: { required: "This field is required" },
  })

  const { field: ownerDistrictField } = useController({
    name: "ownerDistrict",
    control,
    rules: { required: "This field is required" },
  })


  const fetchApiData = useCallback(async () => {
    try {
      const [provincesData, nationalitiesData, countryCodesData] = await Promise.all([
        getProvinces(),
        getNationalities(),
        getCountryCodes(),
      ])
      setProvinces(provincesData)
      setNationalities(nationalitiesData)
      setCountryCodes(countryCodesData)
    } catch (error) {
      console.error("Error fetching initial data:", error)
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



  useEffect(() => {
    fetchApiData()
  }, [fetchApiData])

  useEffect(() => {
    setDistricts([])
    setValue("ownerDistrict", "")
    if (selectedProvince) {
      fetchDistrictsForProvince(selectedProvince)
    }
  }, [selectedProvince, fetchDistrictsForProvince, setValue])

  return (
    <FormSection title="Business Owner Details" icon={User}>
     
      <h3 className="form-sub-section-heading">Business Owner Details</h3>
      
      <div className="form-group">
        <label htmlFor="applicantCitizenship">Applicant citizenship <span className="required">*</span></label>
        <select id="applicantCitizenship" {...applicantCitizenshipField} className="form-select">
          <option value="">Select citizenship</option>
          <option value="Rwandan">Rwandan</option>
          <option value="Foreigner">Foreigner</option>
        </select>
        {errors.applicantCitizenship && <p className="error-message">{errors.applicantCitizenship.message}</p>}
      </div>

      {applicantCitizenship === "Rwandan" && (
        <div className="form-group">
          <label htmlFor="identificationNumber">Identification document number <span className="required">*</span></label>
          <input type="text" id="identificationNumber" {...identificationNumberField} className="form-input" placeholder="Enter Identification document number" />
          {errors.identificationNumber && <p className="error-message">{errors.identificationNumber.message}</p>}
        </div>
      )}

      {applicantCitizenship === "Foreigner" && (
        <div className="form-group">
          <label htmlFor="passportNumber">Passport number <span className="required">*</span></label>
          <input type="text" id="passportNumber" {...passportNumberField} className="form-input" />
          {errors.passportNumber && <p className="error-message">{errors.passportNumber.message}</p>}
        </div>
      )}

      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="otherNames">Other names <span className="required">*</span></label>
          <input type="text" id="otherNames" {...otherNamesField} className="form-input" />
          {errors.otherNames && <p className="error-message">{errors.otherNames.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname <span className="required">*</span></label>
          <input type="text" id="surname" {...surnameField} className="form-input" />
          {errors.surname && <p className="error-message">{errors.surname.message}</p>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="nationality">Nationality <span className="required">*</span></label>
        <select id="nationality" {...nationalityField} className="form-select">
          <option value="">Select nationality</option>
          {nationalities.map((nationality) => (
            <option key={nationality.id} value={nationality.id}>
              {nationality.name}
            </option>
          ))}
        </select>
        {errors.nationality && <p className="error-message">{errors.nationality.message}</p>}
      </div>
      
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <div className="phone-input-group">
            <select id="phoneCountryCode" {...phoneCountryCodeField} className="phone-input-prefix">
              {countryCodes.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.dial_code}
                </option>
              ))}
            </select>
            <input type="tel" id="phoneNumber" {...phoneNumberField} className="form-input" placeholder="Enter phone number" />
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="emailAddress">E-mail address</label>
          <input type="email" id="emailAddress" {...emailAddressField} className="form-input" placeholder="Enter email address" />
          {errors.emailAddress && <p className="error-message">{errors.emailAddress.message}</p>}
        </div>
      </div>

     
      <h3 className="form-sub-section-heading">Business Owner Address</h3>
      
      <div className="form-group">
        <label htmlFor="ownerProvince">Province <span className="required">*</span></label>
        <select id="ownerProvince" {...ownerProvinceField} className="form-select">
          <option value="">Select province</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.ownerProvince && <p className="error-message">{errors.ownerProvince.message}</p>}
      </div>
      
      {selectedProvince && (
        <div className="form-group">
          <label htmlFor="ownerDistrict">District <span className="required">*</span></label>
          <select 
            id="ownerDistrict" 
            {...ownerDistrictField} 
            className="form-select"
            disabled={districts.length === 0}
          >
            <option value="">Enter district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.ownerDistrict && <p className="error-message">{errors.ownerDistrict.message}</p>}
        </div>
      )}

    </FormSection>
  )
}

export default BusinessOwnerDetailsStep