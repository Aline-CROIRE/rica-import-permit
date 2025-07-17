// src/hooks/useRICAForm.js

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { submitApplication } from "../services/api"


const initialFormValues = {
  applicantCitizenship: "Rwandan",
  identificationNumber: "",
  passportNumber: "",
  otherNames: "",
  surname: "",
  nationality: "",
  phoneCountryCode: "+250",
  phoneNumber: "",
  emailAddress: "",
  ownerProvince: "",
  ownerDistrict: "",

  businessType: "Retailer",
  companyName: "",
  tinNumber: "",
  registrationDate: "",
  businessProvince: "",
  businessDistrict: "",

  purposeOfImportation: "Direct sale",
  productCategory: "",
  productName: "",
  weight: "",
  unitOfMeasurement: "",
  quantity: "",
  description: "",
  specifyPurpose: "",
};


export function useRICAForm(steps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: initialFormValues,
  })


  const applicantCitizenship = watch("applicantCitizenship")
  const purposeOfImportation = watch("purposeOfImportation")


  useEffect(() => {
    if (applicantCitizenship === "Rwandan") {
      clearErrors(["passportNumber"])
      setValue("passportNumber", "")
    } else {
      clearErrors("identificationNumber")
      setValue("identificationNumber", "")
    }
  }, [applicantCitizenship, clearErrors, setValue])

  useEffect(() => {
    if (purposeOfImportation !== "Other") {
      clearErrors("specifyPurpose")
      setValue("specifyPurpose", "")
    }
  }, [purposeOfImportation, clearErrors, setValue])


  const getValidationFieldsForStep = (step) => {
    const currentCitizenship = getValues("applicantCitizenship");
    const currentPurpose = getValues("purposeOfImportation");

    const fieldsByStep = [
      
      ["applicantCitizenship", "otherNames", "surname", "nationality", "ownerProvince", "ownerDistrict", currentCitizenship === "Rwandan" ? "identificationNumber" : "passportNumber"],
  
      ["businessType", "companyName", "tinNumber", "registrationDate", "businessProvince", "businessDistrict"],
      
      ["purposeOfImportation", "productCategory", "productName", "weight", "description", "unitOfMeasurement", "quantity", currentPurpose === "Other" ? "specifyPurpose" : null],
    ];
    return fieldsByStep[step]?.filter(Boolean) || [];
  };

  const handleNext = async () => {
    setError(null);
    const fieldsToValidate = getValidationFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep((prev) => prev - 1);
  };


  const onSubmit = async (data) => {
    setError(null);

    const allRequiredFields = [
      ...getValidationFieldsForStep(0),
      ...getValidationFieldsForStep(1),
      ...getValidationFieldsForStep(2),
    ];

    const isFormCompletelyValid = await trigger(allRequiredFields);

    if (!isFormCompletelyValid) {
      console.error("Final submission validation failed. Errors:", errors);
      setError("Please fix all errors on the form before submitting.");

      for (let i = 0; i < steps.length - 1; i++) {
        const stepFields = getValidationFieldsForStep(i);
        if (stepFields.some(field => errors[field])) {
          setCurrentStep(i);
          const firstErrorField = stepFields.find(field => errors[field]);
          if (firstErrorField) {
            document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          break;
        }
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitApplication(data);
      if (response.success) {
        setSubmissionResult(response.data);
        setSuccessModalOpen(true);
      } else {
        setError(response.message || "An unexpected error occurred during submission.");
      }
    } catch (err) {
      console.error("Submission API Error:", err);
      setError(err.response?.data?.message || err.message || "A network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
 
  const resetForm = () => {
  
    reset(initialFormValues);
   
    setCurrentStep(0);
   
    setSubmissionResult(null);
  };

  return {
    currentStep,
    isLoading,
    error,
    successModalOpen,
    submissionResult,
    control,
    handleSubmit: handleSubmit(onSubmit),
    getValues,
    watch,
    errors,
    setValue,
    handleNext,
    handlePrevious,
    setSuccessModalOpen,
    setError,
    resetForm, 
  };
}