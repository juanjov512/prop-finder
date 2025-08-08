import React, { ChangeEvent, useCallback } from "react";
import type { IRangeInputProps } from "./types";
import {
  RangeContainer,
  RangeLabel,
  RangeWrapper,
  RangeInput as StyledRangeInput,
  RangeSeparator,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
  SliderWrapper,
} from "./styles";

const NumberRangeInput: React.FC<IRangeInputProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  style,
  disabled = false,
  label,
  showValues = true,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  useSlider = false,
  sliderTrackClassName,
  sliderRangeClassName,
  sliderThumbClassName,
}) => {
  const handleMinChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newMin = parseFloat(e.target.value) || 0;
      onChange({
        min: Math.min(newMin, value.max),
        max: value.max,
      });
    },
    [onChange, value.max]
  );

  const handleMaxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newMax = parseFloat(e.target.value) || 0;
      onChange({
        min: value.min,
        max: Math.max(newMax, value.min),
      });
    },
    [onChange, value.min]
  );

  const handleSliderChange = (values: number[]) => {
    onChange({
      min: Math.min(...values),
      max: Math.max(...values),
    });
  };

  return (
    <RangeContainer className={className} style={style}>
      {label && <RangeLabel>{label}</RangeLabel>}
      {useSlider && (
        <SliderWrapper>
          <SliderRoot
            value={[value.min, value.max]}
            min={min}
            max={max}
            step={step}
            onValueChange={handleSliderChange}
            disabled={disabled}
          >
            <SliderTrack className={sliderTrackClassName}>
              <SliderRange className={sliderRangeClassName} />
            </SliderTrack>
            <SliderThumb className={sliderThumbClassName} />
            <SliderThumb className={sliderThumbClassName} />
          </SliderRoot>
        </SliderWrapper>
      )}
      {
        <RangeWrapper>
          <StyledRangeInput
            type="number"
            value={value.min}
            min={min}
            max={value.max}
            step={step}
            onChange={handleMinChange}
            disabled={disabled}
            placeholder={minPlaceholder}
            aria-label="Minimum value"
          />
          <RangeSeparator>-</RangeSeparator>
          <StyledRangeInput
            type="number"
            value={value.max}
            min={value.min}
            max={max}
            step={step}
            onChange={handleMaxChange}
            disabled={disabled}
            placeholder={maxPlaceholder}
            aria-label="Maximum value"
          />
          {showValues && (
            <RangeSeparator>
              ({value.min} - {value.max})
            </RangeSeparator>
          )}
        </RangeWrapper>
      }
    </RangeContainer>
  );
};

export default NumberRangeInput;
