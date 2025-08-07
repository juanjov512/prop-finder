import { useState, useCallback, useMemo } from 'react';

interface AutocompleteOption {
  value: string;
  label: string;
  type?: string;
}

interface UseAutocompleteProps {
  options: AutocompleteOption[];
  query: string;
  maxSuggestions?: number;
  minQueryLength?: number;
}

export const useAutocomplete = ({
  options,
  query,
  maxSuggestions = 5,
  minQueryLength = 2,
}: UseAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filteredOptions = useMemo(() => {
    if (query.length < minQueryLength) {
      return [];
    }

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.value.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, maxSuggestions);
  }, [options, query, maxSuggestions, minQueryLength]);

  const openDropdown = useCallback(() => {
    if (filteredOptions.length > 0) {
      setIsOpen(true);
      setSelectedIndex(-1);
    }
  }, [filteredOptions.length]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  const selectOption = useCallback((option: AutocompleteOption) => {
    closeDropdown();
    return option;
  }, [closeDropdown]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectOption(filteredOptions[selectedIndex]);
        }
        break;
      case 'Escape':
        closeDropdown();
        break;
    }
  }, [isOpen, filteredOptions, selectedIndex, selectOption, closeDropdown]);

  return {
    filteredOptions,
    isOpen,
    selectedIndex,
    openDropdown,
    closeDropdown,
    selectOption,
    handleKeyDown,
  };
}; 