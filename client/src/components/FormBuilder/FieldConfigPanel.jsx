import React, { useState, useEffect } from "react";

export function FieldConfigPanel({ field, onUpdateField }) {
  // Create local state to manage field configuration
  const [localField, setLocalField] = useState({
    label: field.label,
    placeholder: field.placeholder,
    required: field.required,
    options: field.options || [],
  });

  // Use useEffect to sync local state with prop changes
  useEffect(() => {
    setLocalField({
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options || [],
    });
  }, [field]);

  // Handle input changes with controlled components
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedField = { ...localField, [name]: value };

    // Update local state immediately
    setLocalField(updatedField);

    // Trigger parent update
    onUpdateField({
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedField = { ...localField, [name]: checked };

    // Update local state immediately
    setLocalField(updatedField);

    // Trigger parent update
    onUpdateField({
      [name]: checked,
    });
  };

  // Handle option changes for dropdown/radio/checkbox
  const handleOptionChange = (index, value) => {
    const newOptions = [...localField.options];
    newOptions[index] = value;

    // Update local state
    setLocalField((prev) => ({
      ...prev,
      options: newOptions,
    }));

    // Trigger parent update
    onUpdateField({
      options: newOptions,
    });
  };

  // Add a new option
  const addOption = () => {
    const newOptions = [
      ...localField.options,
      `Option ${localField.options.length + 1}`,
    ];

    // Update local state
    setLocalField((prev) => ({
      ...prev,
      options: newOptions,
    }));

    // Trigger parent update
    onUpdateField({
      options: newOptions,
    });
  };

  // Remove an option
  const removeOption = (index) => {
    const newOptions = localField.options.filter((_, i) => i !== index);

    // Update local state
    setLocalField((prev) => ({
      ...prev,
      options: newOptions,
    }));

    // Trigger parent update
    onUpdateField({
      options: newOptions,
    });
  };

  return (
    <div className="field-settings">
      {/* Label Input */}
      <div>
        <label className="">Field Label</label>
        <input
          type="text"
          name="label"
          value={localField.label}
          onChange={handleInputChange}
          className=""
        />
      </div>

      {/* Placeholder Input */}
      <div>
        <label className="">Placeholder</label>
        <input
          type="text"
          name="placeholder"
          value={localField.placeholder}
          onChange={handleInputChange}
          className=""
        />
      </div>

      {/* Required Checkbox */}
      <div className="">
        <input
          type="checkbox"
          id="required"
          name="required"
          checked={localField.required}
          onChange={handleCheckboxChange}
          className=""
        />
        <label htmlFor="required" className="">
          Required Field
        </label>
      </div>

      {/* Options for dropdown, radio, checkbox */}
      {(field.type === "dropdown" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <div>
          <label className="">Options</label>
          <div className="">
            {localField.options.map((option, index) => (
              <div key={index} className="">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className=""
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className=""
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className=""
            >
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
