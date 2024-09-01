import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FieldTypeSelector from './FieldTypeSelector';
import FormPreview from './FormPreview';
import FieldConfigPanel from './FieldConfigPanel';

export default function FormBuilder() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* Form Settings Panel */}
      <div className="md:col-span-1 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Form Settings</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Form Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormSettings({ title: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              updateFormSettings({ description: e.target.value })
            }
            className="w-full border rounded p-2"
            rows="3"
          />
        </div>

        <h3 className="text-lg font-bold mt-6 mb-3">Add Field</h3>
        <FieldTypeSelector onAddField={addField} />

        <button
          onClick={saveForm}
          disabled={isSaving}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex justify-center items-center"
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>

        {formSaved && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-center">
            Form saved successfully!
          </div>
        )}
      </div>

      {/* Form Preview */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Form Preview</h2>
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
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Field Settings</h2>
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