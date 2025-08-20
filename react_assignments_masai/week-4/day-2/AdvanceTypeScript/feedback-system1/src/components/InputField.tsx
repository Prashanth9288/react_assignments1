import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "number";
  value: string | number | "";
  placeholder?: string;
  min?: number;
  max?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  min,
  max,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label} {required && <span className="req">*</span>}
      </label>
      <input
        id={name}
        className={`input ${error ? "input-error" : ""}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
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

export default InputField;
