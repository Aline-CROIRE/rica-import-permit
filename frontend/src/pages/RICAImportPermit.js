// src/pages/RICAImportPermit.jsx

"use client"

import StepIndicator from "../components/common/StepIndicator"
import Breadcrumb from "../components/common/Breadcrumb"
import BusinessOwnerDetailsStep from "../components/forms/BusinessOwnerDetailsStep"
import BusinessDetailsStep from "../components/forms/BusinessDetailsStep"
import ProductInformationStep from "../components/forms/ProductInformationStep"
import SummaryStep from "../components/forms/SummaryStep"
import LoadingSpinner from "../components/common/LoadingSpinner"
import ErrorAlert from "../components/common/ErrorAlert"
import SuccessModal from "../components/common/SuccessModal"
import { useRICAForm } from "../hooks/useRICAForm"
import "./RICAImportPermit.css"

const steps = [
  { title: "Business Owner Details", component: BusinessOwnerDetailsStep },
  { title: "Business Details", component: BusinessDetailsStep },
  { title: "Product Information", component: ProductInformationStep },
  { title: "Summary", component: SummaryStep },
]

const stepTitles = steps.map(s => s.title)

function RICAImportPermit() {

  const {
    currentStep,
    isLoading,
    error,
    successModalOpen,
    submissionResult,
    control,
    handleSubmit,
    getValues,
    watch,
    errors,
    setValue,
    handleNext,
    handlePrevious,
    setSuccessModalOpen,
    setError,
    resetForm, 
  } = useRICAForm(steps)

  const CurrentStepComponent = steps[currentStep].component

  
  const handleModalClose = () => {
    setSuccessModalOpen(false); 
    resetForm(); 
  };

  return (
    <div className="rica-import-permit-container">
      {isLoading && <LoadingSpinner />}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      <h1 className="rica-title">RICA Import Permit Application</h1>

      <div className="form-card">
        <Breadcrumb steps={stepTitles} currentStep={currentStep} />
        <StepIndicator steps={stepTitles} currentStep={currentStep} />
        
        <form onSubmit={handleSubmit} className="rica-form">
          <CurrentStepComponent
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            formData={getValues()}
          />

          <div className="form-navigation">
            {currentStep > 0 && (
              <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>

      {submissionResult && (
        <SuccessModal
          isOpen={successModalOpen}
          
          onClose={handleModalClose}
          applicationId={submissionResult.applicationId}
          submissionDate={submissionResult.submissionDate}
        />
      )}
    </div>
  )
}

export default RICAImportPermit