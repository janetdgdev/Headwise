export function FormPreview({
  formData,
  selectedFieldId,
  onSelectField,
  onRemoveField,
  onMoveField,
}) {
  const renderField = (field) => {
    const isSelected = selectedFieldId === field.id;
    // styling based on selected or not
    const fieldClasses = `.. ${isSelected ? "..selected" : "..notSelected"}`;

    let fieldElement;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        fieldElement = (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className=""
            disabled
          />
        );
        break;
      case "textarea":
        fieldElement = (
          <textarea placeholder={field.placeholder} className="" disabled />
        );
        break;
      case "dropdown":
        fieldElement = (
          <select className="" disabled>
            <option value="">Select an option</option>
            {field.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        break;
      case "radio":
        fieldElement = (
          <div className="">
            {field.options.map((option, i) => (
              <div key={i} className="">
                <input
                  type="radio"
                  id={`${field.id}-${i}`}
                  name={field.id}
                  className=""
                  disabled
                />
                <label htmlFor={`${field.id}-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        );
        break;
      case "checkbox":
        fieldElement = (
          <div className="space-y-2">
            {field.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.id}-${i}`}
                  className=""
                  disabled
                />
                <label htmlFor={`${field.id}-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        );
        break;
      case "date":
        fieldElement = <input type="date" className="" disabled />;
        break;
      case "file":
        fieldElement = <input type="file" className="" disabled />;
        break;
      default:
        fieldElement = <p>Unsupported field type</p>;
    }

    return (
      <div
        key={field.id}
        className={fieldClasses}
        onClick={() => onSelectField(field)}
      >
        <div className="">
          <label className="">
            {field.label}{" "}
            {field.required && <span className="asterisk">*</span>}
          </label>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveField(field.id);
            }}
            className="remove">
            &times;</button>
        </div>
        {fieldElement}
      </div>
    );
  };

  return (
    <div className="form-preview-component">
      <h2 className="section-title">Form Preview</h2>
      <h3 className="preview-title">{formData.title}</h3>
      {formData.description && (
        <p className="preview-description">{formData.description}</p>
      )}

      {formData.fields.length === 0 ? (
        <div>
          <p className="preview-placeholder">
            Your form is empty. Add fields from the form settings.
          </p>
        </div>
      ) : (
        <div>{formData.fields.map((field) => renderField(field))}</div>
      )}
    </div>
  );
}
