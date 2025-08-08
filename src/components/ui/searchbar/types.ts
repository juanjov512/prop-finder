interface IAutocompleteOption {
  value: string;
  label: string;
};
  
interface IAutocompleteSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onSelect?: (option: IAutocompleteOption) => void;
  options?: IAutocompleteOption[];
  disabled?: boolean;
  className?: string;
};

export type { IAutocompleteOption, IAutocompleteSearchBarProps };