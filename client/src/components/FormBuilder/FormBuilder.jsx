import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldTypeSelector } from "src/components/FormBuilder/FieldTypeSelector";
import { FormPreview } from "src/components/FormBuilder/FormPreview";
import { FieldConfigPanel } from "src/components/FormBuilder/FieldConfigPanel";

export function FormBuilder() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fields: [],
  });
  const [selectedField, setSelectedField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formSaved, setFormSaved] = useState(false);

  const addField = (fieldType) => {
    const newField = {
      id: uuidv4(),
      type: fieldType,
      label: `New ${fieldType} field`,
      placeholder: "",
      required: false,
      options:
        fieldType === "dropdown" || fieldType === "radio"
          ? ["Option 1", "Option 2"]
          : [],
      validation: null,
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setSelectedField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const removeField = (fieldId) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));

    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null);
    }
  };

  const moveField = (dragIndex, hoverIndex) => {
    const newFields = [...formData.fields];
    const draggedField = newFields[dragIndex];

    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);

    setFormData((prev) => ({
      ...prev,
      fields: newFields,
    }));
  };

  const updateFormSettings = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const saveForm = () => {
    try {
      // Generate a unique ID for the form
      const formId = `form_${Date.now()}`;

      // Get existing forms from local storage or initialize an empty array
      const existingForms = JSON.parse(
        localStorage.getItem("savedForms") || "[]"
      );

      // Add the new form to the existing forms
      const updatedForms = [
        ...existingForms,
        {
          id: formId,
          ...formData,
          createdAt: new Date().toISOString(),
        },
      ];

      // Save to local storage
      localStorage.setItem("savedForms", JSON.stringify(updatedForms));

      // Optional: Show success message
      alert("Form saved successfully!");

      // Optional: Reset form or navigate
      setFormData({
        title: "Untitled Form",
        description: "",
        fields: [],
      });
    } catch (error) {
      // Handle potential localStorage errors
      console.error("Failed to save form", error);
      alert("Failed to save form. Please try again.");
    }
  };

  return (
    <div className="form-builder-container">
      {/* Form Settings Panel */}

      <div className="form-settings">
        <h2 className="section-title">Form Settings</h2>
        <label>Form Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormSettings({ title: e.target.value })}
          placeholder="Title"
        />
        <label className="">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormSettings({ description: e.target.value })}
        />
        <h3>Add Field</h3>
        <FieldTypeSelector onAddField={addField} className="field-selector" />
        <button onClick={saveForm} disabled={isSaving} className="btn">
          {isSaving ? "Saving..." : "Save Form"}
        </button>

        {formSaved && (
          <div className="form-success">Form saved successfully!</div>
        )}
        <div className="field-settings">
          {/* Field Configuration Panel */}
          {selectedField && (
            <div className="field-settings-container">
              <h2 className="">Field Settings</h2>
              <FieldConfigPanel
                field={selectedField}
                onUpdateField={(updates) =>
                  updateField(selectedField.id, updates)
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Form Preview */}
      <div className="form-preview">
        <div className="preview">
          <FormPreview
            className="form-preview-component"
            formData={formData}
            selectedFieldId={selectedField?.id}
            onSelectField={setSelectedField}
            onRemoveField={removeField}
            onMoveField={moveField}
          />
        </div>
      </div>
    </div>
  );
}
