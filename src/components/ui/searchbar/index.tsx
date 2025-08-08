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
} from "./styles";
import type { IAutocompleteOption, IAutocompleteSearchBarProps } from "./types";

const AutocompleteSearchBar: React.FC<IAutocompleteSearchBarProps> = ({
  placeholder,
  value = "",
  onChange,
  onSearch,
  onSelect,
  options = [],
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

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

      if (newValue === "") {
        onSearch?.("");
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
    onChange?.("");
    onSearch?.("");
    closeDropdown();
  }, [onChange, onSearch, closeDropdown]);

  const handleOptionSelect = useCallback(
    (option: IAutocompleteOption) => {
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
        } else if (filteredOptions.length > 0) {
          handleOptionSelect(filteredOptions[0]);
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
      handleKeyDown,
      inputValue,
      onSearch,
    ]
  );

  return (
    <SearchBarContainer ref={containerRef} className={className}>
      <SearchIcon
        onClick={() => {
          if (filteredOptions.length > 0) {
            if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
              handleOptionSelect(filteredOptions[selectedIndex]);
            } else {
              handleOptionSelect(filteredOptions[0]);
            }
          } else {
            onSearch?.(inputValue);
          }
        }}
        style={{
          cursor:
            filteredOptions.length > 0 || inputValue.trim()
              ? "pointer"
              : "default",
        }}
      >
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
            </AutocompleteOption>
          ))}
        </AutocompleteDropdown>
      )}
    </SearchBarContainer>
  );
};

export default AutocompleteSearchBar;
