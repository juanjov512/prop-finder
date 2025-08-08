import { CSSProperties } from 'react';

interface IRangeInputProps {
  value: { min: number; max: number };
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: { min: number; max: number }) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  label?: string;
  showValues?: boolean;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  useSlider?: boolean;
  sliderTrackClassName?: string;
  sliderRangeClassName?: string;
  sliderThumbClassName?: string;
}

export type { IRangeInputProps };
