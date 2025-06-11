import React from 'react';
import CharCounter from './CharCounter';

interface InputFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 100,
  multiline = false,
  rows = 3,
  disabled = false,
}) => {
  const Component = multiline ? "textarea" : "input";

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Component
        type={multiline ? undefined : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={multiline ? rows : undefined}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
          multiline ? "min-h-[80px]" : ""
        } ${
          disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
        }`}
      />
      <CharCounter current={value.length} max={maxLength} />
    </div>
  );
};

export default InputField;