export interface IFilterOption {
  value: string | number;
  label: string;
}

export interface IFilterConfig {
  id: string;
  type: 'range' | 'select' | 'checkbox' | 'text';
  label: string;
  options?: IFilterOption[];
  defaultValue?: unknown;
  min?: number;
  max?: number;
  step?: number;
}