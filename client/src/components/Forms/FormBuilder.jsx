import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FieldTypeSelector } from 'components/Forms/FieldTypeSelector';
import { FormPreview } from 'components/Forms/FormPreview';
import { FieldConfigPanel } from 'components/Forms/FieldConfigPanel';

export function FormBuilder() {
  const [formData, setFormData] = useState({
    title: "Untitled Form",
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

  const saveForm = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        setFormSaved(true);
        setTimeout(() => setFormSaved(false), 3000);
      } else {
        console.error("Failed to save form");
      }
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="">
      {/* Form Settings Panel */}
      <div className="">
        <h2 className="">Form Settings</h2>
        <div className="">
          <label className="">Form Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormSettings({ title: e.target.value })}
            className=""
          />
        </div>
        <div className="">
          <label className="">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              updateFormSettings({ description: e.target.value })
            }
            className=""
            rows="3"
          />
        </div>

        <h3 className="">Add Field</h3>
        <FieldTypeSelector onAddField={addField} />

        <button
          onClick={saveForm}
          disabled={isSaving}
          className=""
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>

        {formSaved && (
          <div className="">
            Form saved successfully!
          </div>
        )}
      </div>

      {/* Form Preview */}
      <div className="">
        <div className="">
          <h2 className="">Form Preview</h2>
          <FormPreview
            formData={formData}
            selectedFieldId={selectedField?.id}
            onSelectField={setSelectedField}
            onRemoveField={removeField}
            onMoveField={moveField}
          />
        </div>

        {/* Field Configuration Panel */}
        {selectedField && (
          <div className="">
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
  );
}