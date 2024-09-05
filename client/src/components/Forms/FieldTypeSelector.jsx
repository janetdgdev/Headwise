export function FieldTypeSelector({ onAddField }) {
  const fieldTypes = [
    { type: "text", label: "Text Field" },
    { type: "textarea", label: "Multi-line Text" },
    { type: "number", label: "Number" },
    { type: "dropdown", label: "Dropdown" },
    { type: "radio", label: "Radio Buttons" },
    { type: "checkbox", label: "Checkboxes" },
    { type: "date", label: "Date" },
    { type: "email", label: "Email" },
    { type: "file", label: "File Upload" },
  ];

  return (
    <div className="form-fields">
      {fieldTypes.map((field) => (
        <button
          className="form-btn"
          key={field.type}
          onClick={() => onAddField(field.type)}>
          {field.label}
        </button>
      ))}
    </div>
  );
}