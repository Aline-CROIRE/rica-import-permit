import { useController } from "react-hook-form"
import FormSection from "./FormSection"
import { Package } from "lucide-react"

function ProductInformationStep({ control, errors, watch }) {
  const { field: purposeOfImportationField } = useController({
    name: "purposeOfImportation",
    control,
    rules: { required: "This field is required" },
  })

  const { field: specifyPurposeField } = useController({
    name: "specifyPurpose",
    control,
    rules: {
      validate: (value) => {
        if (watch("purposeOfImportation") === "Other" && !value) {
          return "This field is required"
        }
        return true
      },
    },
  })

  const { field: productCategoryField } = useController({
    name: "productCategory",
    control,
    rules: { required: "This field is required" },
  })

  const { field: productNameField } = useController({
    name: "productName",
    control,
    rules: {
      required: "This field is required",
    },
  })

  const { field: weightField } = useController({
    name: "weight",
    control,
    rules: {
      min: { value: 0, message: "Weight must be a positive number." },
      valueAsNumber: true,
    },
  })

  const { field: descriptionField } = useController({
    name: "description",
    control,
    rules: {
      required: "This field is required",
    },
  })

  const { field: unitOfMeasurementField } = useController({
    name: "unitOfMeasurement",
    control,
    rules: { required: "This field is required" },
  })

  const { field: quantityField } = useController({
    name: "quantity",
    control,
    rules: {
      required: "This field is required",
      min: { value: 1, message: "Please provide number greater than zero." },
      valueAsNumber: true,
    },
  })

  const purposeOfImportation = watch("purposeOfImportation")

  return (
    <FormSection title="Product Information" icon={Package}>
      <h3 className="form-sub-section-heading">Importation details</h3>
      <div className="form-group">
        <label htmlFor="purposeOfImportation">
          Purpose of importation <span className="required">*</span>
        </label>
        <select id="purposeOfImportation" {...purposeOfImportationField} className="form-select">
          <option value="">Select the purpose of importation</option>
          <option value="Direct sale">Direct sale</option>
          <option value="Personal use">Personal use</option>
          <option value="Trial use">Trial use</option>
          <option value="Other">Other</option>
        </select>
        {errors.purposeOfImportation && <p className="error-message">{errors.purposeOfImportation.message}</p>}
      </div>

      {purposeOfImportation === "Other" && (
        <div className="form-group">
          <label htmlFor="specifyPurpose">
            Specify purpose of importation <span className="required">*</span>
          </label>
          <input
            type="text"
            id="specifyPurpose"
            {...specifyPurposeField}
            className="form-input"
          />
          {errors.specifyPurpose && <p className="error-message">{errors.specifyPurpose.message}</p>}
        </div>
      )}

      <h3 className="form-sub-section-heading">Product details</h3>
      <div className="form-group">
        <label htmlFor="productCategory">
          Product category <span className="required">*</span>
        </label>
        <select id="productCategory" {...productCategoryField} className="form-select">
          <option value="">Select product category</option>
          <option value="General purpose">General purpose</option>
          <option value="Construction materials">Construction materials</option>
          <option value="Chemicals">Chemicals</option>
        </select>
        {errors.productCategory && <p className="error-message">{errors.productCategory.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="productName">
          Product name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="productName"
          {...productNameField}
          className="form-input"
          placeholder="Enter product name"
        />
        {errors.productName && <p className="error-message">{errors.productName.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight (kg)</label>
        <input type="number" id="weight" {...weightField} className="form-input" placeholder="Weight (kg)" min="0" />
        {errors.weight && <p className="error-message">{errors.weight.message}</p>}
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="unitOfMeasurement">
            Unit of measurement <span className="required">*</span>
          </label>
          <select id="unitOfMeasurement" {...unitOfMeasurementField} className="form-select">
            <option value="">Enter unit of measurement</option>
            <option value="Kgs">Kgs</option>
            <option value="Tonnes">Tonnes</option>
          </select>
          {errors.unitOfMeasurement && <p className="error-message">{errors.unitOfMeasurement.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">
            Quantity of product(s) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            {...quantityField}
            className="form-input"
            placeholder="Enter quantity"
            min="1"
          />
          {errors.quantity && <p className="error-message">{errors.quantity.message}</p>}
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="description">
          Description of products <span className="required">*</span>
        </label>
        <textarea
          id="description"
          {...descriptionField}
          className="form-textarea"
          rows="4"
          placeholder="Enter product description"
        ></textarea>
        {errors.description && <p className="error-message">{errors.description.message}</p>}
      </div>
    </FormSection>
  )
}

export default ProductInformationStep
