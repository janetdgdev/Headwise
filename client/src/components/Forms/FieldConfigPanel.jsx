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
    <div className="field-settings">
      <div>
        <label className="">Field Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdateField({ label: e.target.value })}
          className=""/>
      </div>

      <div>
        <label className="">Placeholder</label>
        <input
          type="text"
          value={field.placeholder}
          onChange={(e) => onUpdateField({ placeholder: e.target.value })}
          className=""/>
      </div>

      <div className="">
        <input
          type="checkbox"
          id="required"
          checked={field.required}
          onChange={(e) => onUpdateField({ required: e.target.checked })}
          className=""/>
        <label htmlFor="required" className="">
          Required
        </label>
      </div>

      {(field.type === "dropdown" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <div>
          <label className="1">Options</label>
          <div className="">
            {field.options.map((option, index) => (
              <div key={index} className="">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className=""/>
                <button
                  onClick={() => removeOption(index)}
                  className="">&times;</button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="">+ Add Option</button>
          </div>
        </div>
      )}
    </div>
  );
}
