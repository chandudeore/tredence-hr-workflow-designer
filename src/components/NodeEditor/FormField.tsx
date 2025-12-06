import React from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className="form-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
          />
        );
      case "select":
        return (
          <select
            className="form-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            className="form-checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        );
      default:
        return (
          <input
            type={type}
            className="form-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;
