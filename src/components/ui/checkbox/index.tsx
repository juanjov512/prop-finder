import React, { useId } from "react";
import {
  CheckboxContainer,
  CheckboxInput,
  CheckboxControl,
  CheckboxLabel,
  CheckboxGroupContainer,
} from "./styles";
import type { ICheckboxProps, ICheckboxGroupProps } from "./types";

export const Checkbox: React.FC<ICheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  value,
  ...props
}: ICheckboxProps) => {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, value);
    }
  };

  return (
    <CheckboxContainer htmlFor={id} className={className} disabled={disabled}>
      <CheckboxInput
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        value={value}
        {...props}
      />
      <CheckboxControl
        className="checkbox__control"
        checked={checked}
        disabled={disabled}
      />
      {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = ({
  options,
  selectedValues = [],
  onChange,
  className = "",
  disabled = false,
  name = "",
}: ICheckboxGroupProps) => {
  const handleCheckboxChange = (checked: boolean, value: string) => {
    const newSelectedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    onChange(newSelectedValues);
  };

  return (
    <CheckboxGroupContainer className={className}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={selectedValues.includes(option.value)}
          onChange={handleCheckboxChange}
          disabled={disabled}
        />
      ))}
    </CheckboxGroupContainer>
  );
};

export default Checkbox;
