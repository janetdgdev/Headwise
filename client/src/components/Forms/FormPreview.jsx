export function FormPreview ({
  formData,
  selectedFieldId,
  onSelectField,
  onRemoveField,
  onMoveField,
}) {
  const renderField = (field) => {
    const isSelected = selectedFieldId === field.id;

    const fieldClasses = `p-4 border rounded mb-4 ${
      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
    }`;

    let fieldElement;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        fieldElement = (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full border rounded p-2"
            disabled
          />
        );
        break;
      case "textarea":
        fieldElement = (
          <textarea
            placeholder={field.placeholder}
            rows="3"
            className="w-full border rounded p-2"
            disabled
          />
        );
        break;
      case "dropdown":
        fieldElement = (
          <select className="w-full border rounded p-2" disabled>
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
          <div className="space-y-2">
            {field.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${i}`}
                  name={field.id}
                  className="mr-2"
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
                  className="mr-2"
                  disabled
                />
                <label htmlFor={`${field.id}-${i}`}>{option}</label>
              </div>
            ))}
          </div>
        );
        break;
      case "date":
        fieldElement = (
          <input type="date" className="w-full border rounded p-2" disabled />
        );
        break;
      case "file":
        fieldElement = <input type="file" className="w-full" disabled />;
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
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveField(field.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>
        {fieldElement}
      </div>
    );
  };

  return (
    <div className="form-preview">
      <h3 className="text-xl font-bold mb-2">{formData.title}</h3>
      {formData.description && <p className="mb-6">{formData.description}</p>}

      {formData.fields.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded">
          <p className="text-gray-500">
            Your form is empty. Add fields from the panel on the left.
          </p>
        </div>
      ) : (
        <div>{formData.fields.map((field) => renderField(field))}</div>
      )}
    </div>
  );
};
