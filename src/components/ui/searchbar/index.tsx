import React, { useState, useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import {
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
  AutocompleteDropdown,
  AutocompleteOption,
  AutocompleteOptionLabel,
  AutocompleteOptionType,
} from "./styles";

interface AutocompleteOption {
  value: string;
  label: string;
  type?: string;
}

interface AutocompleteSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  options?: AutocompleteOption[];
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
}

const AutocompleteSearchBar: React.FC<AutocompleteSearchBarProps> = ({
  placeholder,
  value = "",
  onChange,
  onSearch,
  onSelect,
  options = [],
  debounceMs = 300,
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    filteredOptions,
    isOpen,
    selectedIndex,
    openDropdown,
    closeDropdown,
    handleKeyDown,
  } = useAutocomplete({
    options,
    query: inputValue,
    maxSuggestions: 5,
    minQueryLength: 2,
  });

  // Update internal state when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, debounceMs]);

  // Call onSearch when debounced value changes
  useEffect(() => {
    if (onSearch && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);

      // Llamar a onSearch inmediatamente cuando se vacía el input
      if (newValue === "") {
        onSearch?.("");
        setDebouncedValue(""); // Resetear el debounce también
      }

      if (newValue.length >= 2) {
        openDropdown();
      } else {
        closeDropdown();
      }
    },
    [onChange, onSearch, openDropdown, closeDropdown]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setDebouncedValue(""); // Resetear el debounce también
    onChange?.("");
    onSearch?.("");
    closeDropdown();
  }, [onChange, onSearch, closeDropdown]);

  const handleOptionSelect = useCallback(
    (option: AutocompleteOption) => {
      setInputValue(option.label);
      onChange?.(option.label);
      onSelect?.(option);
      closeDropdown();
    },
    [onChange, onSelect, closeDropdown]
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        } else {
          onSearch?.(inputValue);
        }
        return;
      }

      handleKeyDown(e);
    },
    [
      selectedIndex,
      filteredOptions,
      handleOptionSelect,
      onSearch,
      inputValue,
      handleKeyDown,
    ]
  );

  return (
    <SearchBarContainer ref={containerRef} className={className}>
      <SearchIcon>
        <FontAwesomeIcon icon={faSearch} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={() => {
          if (inputValue.length >= 2) {
            openDropdown();
          }
        }}
        disabled={disabled}
      />
      {inputValue && (
        <ClearButton onClick={handleClear} disabled={disabled}>
          <FontAwesomeIcon icon={faTimes} />
        </ClearButton>
      )}

      {isOpen && filteredOptions.length > 0 && (
        <AutocompleteDropdown>
          {filteredOptions.map((option, index) => (
            <AutocompleteOption
              key={option.value}
              $isSelected={index === selectedIndex}
              onClick={() => handleOptionSelect(option)}
            >
              <AutocompleteOptionLabel>{option.label}</AutocompleteOptionLabel>
              {option.type && (
                <AutocompleteOptionType>{option.type}</AutocompleteOptionType>
              )}
            </AutocompleteOption>
          ))}
        </AutocompleteDropdown>
      )}
    </SearchBarContainer>
  );
};

export default AutocompleteSearchBar;
