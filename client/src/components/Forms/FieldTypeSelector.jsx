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
    <div className="grid grid-cols-2 gap-2">
      {fieldTypes.map((field) => (
        <button
          key={field.type}
          onClick={() => onAddField(field.type)}
          className="border border-gray-300 rounded p-2 text-sm hover:bg-gray-50"
        >
          {field.label}
        </button>
      ))}
    </div>
  );
}