import { CSSProperties } from 'react';

export interface RangeInputProps {
  /** Current value of the range */
  value: { min: number; max: number };
  /** Minimum value of the range */
  min?: number;
  /** Maximum value of the range */
  max?: number;
  /** Step size for the range */
  step?: number;
  /** Callback when the value changes */
  onChange: (value: { min: number; max: number }) => void;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Label for the range input */
  label?: string;
  /** Whether to show the current values */
  showValues?: boolean;
  /** Placeholder for the minimum input */
  minPlaceholder?: string;
  /** Placeholder for the maximum input */
  maxPlaceholder?: string;
  /** Whether to use the slider UI instead of number inputs */
  useSlider?: boolean;
  /** Custom class name for the slider track */
  sliderTrackClassName?: string;
  /** Custom class name for the slider range */
  sliderRangeClassName?: string;
  /** Custom class name for the slider thumb */
  sliderThumbClassName?: string;
}