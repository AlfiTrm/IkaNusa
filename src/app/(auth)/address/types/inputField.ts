export interface InputFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
}


