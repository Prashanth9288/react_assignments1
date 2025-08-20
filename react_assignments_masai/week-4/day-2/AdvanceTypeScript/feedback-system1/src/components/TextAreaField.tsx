import React, { ChangeEvent } from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label} {required && <span className="req">*</span>}
      </label>
      <textarea
        id={name}
        className={`textarea ${error ? "input-error" : ""}`}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <div id={`${name}-error`} className="error">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextAreaField;
