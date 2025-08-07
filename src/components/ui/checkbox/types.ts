import { InputHTMLAttributes, ReactNode } from 'react';

interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: ReactNode;
  value: string;
  checked?: boolean;
  onChange?: (checked: boolean, value: string) => void;
  disabled?: boolean;
  className?: string;
}

interface ICheckboxGroupProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
}

export type { ICheckboxProps, ICheckboxGroupProps }
