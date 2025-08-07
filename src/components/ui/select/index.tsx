import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import {
  SelectContainer,
  SelectButton,
  SelectOptions,
  SelectOption,
  SelectOptionIndicator,
} from "./styles";
import type { ISelectProps } from "./types";

const Select: React.FC<ISelectProps> = ({
  options,
  value,
  onChange,
}: ISelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const selectedOption = options.find((option): boolean => {
    return String(option.value) === String(value);
  });

  const handleOptionClick = useCallback(
    (newValue: string) => {
      setSelectedValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <SelectContainer value={selectedValue} onValueChange={handleOptionClick}>
      <SelectButton>
        <span>{selectedOption?.label || "Seleccionar"}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </SelectButton>
      <SelectOptions>
        {options.map((option) => (
          <SelectOption
            key={option.value}
            isSelected={String(option.value) === String(value)}
            value={String(option.value)}
          >
            <span>{option.label}</span>
            {String(option.value) === String(value) && (
              <SelectOptionIndicator>
                <FontAwesomeIcon icon={faCheck} />
              </SelectOptionIndicator>
            )}
          </SelectOption>
        ))}
      </SelectOptions>
    </SelectContainer>
  );
};

export default Select;
