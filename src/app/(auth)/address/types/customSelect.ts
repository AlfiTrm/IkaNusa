import { SelectOption } from "./SelectOption";

export interface CustomSelectProps {
  placeholder: string;
  options: SelectOption[];
  value: string
  onChange: (value: string) => void;
  disabled?: boolean;
}