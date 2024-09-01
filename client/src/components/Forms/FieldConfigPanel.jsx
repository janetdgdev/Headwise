export function FieldConfigPanel({ field, onUpdateField }) {
  const handleOptionChange = (index, value) => {
    const newOptions = [...field.options];
    newOptions[index] = value;
    onUpdateField({ options: newOptions });
  };

  const addOption = () => {
    onUpdateField({
      options: [...field.options, `Option ${field.options.length + 1}`],
    });
  };

  const removeOption = (index) => {
    onUpdateField({
      options: field.options.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Field Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdateField({ label: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Placeholder</label>
        <input
          type="text"
          value={field.placeholder}
          onChange={(e) => onUpdateField({ placeholder: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={field.required}
          onChange={(e) => onUpdateField({ required: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="required" className="text-sm font-medium">
          Required
        </label>
      </div>

      {(field.type === "dropdown" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <div>
          <label className="block text-sm font-medium mb-1">Options</label>
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 border rounded p-2"
                />
                <button
                  onClick={() => removeOption(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
};