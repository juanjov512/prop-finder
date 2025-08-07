import React from "react";
import { IFilterOption } from "@/components/filters/types";
import Select from "../select";
import RangeInput from "../input/range";
import { CheckboxGroup } from "../checkbox";
import { FilterContainer, FilterLabel, FilterInput } from "./styles";
import type { IFilterRendererProps } from "./types";

const FilterRenderer: React.FC<IFilterRendererProps> = ({
  filter,
  value,
  onChange,
}) => {
  switch (filter.type) {
    case "range":
      return (
        <FilterContainer>
          <FilterLabel>{filter.label}</FilterLabel>
          <RangeInput
            value={value as { min: number; max: number }}
            min={filter.min || 0}
            max={filter.max || 100}
            step={filter.step || 1}
            onChange={onChange}
            showValues={false}
            useSlider={true}
          />
        </FilterContainer>
      );

    case "select":
      return (
        <FilterContainer>
          <FilterLabel>{filter.label}</FilterLabel>
          <Select
            options={filter.options || []}
            value={value as string}
            onChange={onChange}
          />
        </FilterContainer>
      );

    case "checkbox":
      return (
        <FilterContainer>
          <FilterLabel>{filter.label}</FilterLabel>
          <CheckboxGroup
            options={(filter.options as IFilterOption[]).map((option) => ({
              label: option.label,
              value: String(option.value),
            }))}
            selectedValues={(value as string[]).map((v) => String(v))}
            onChange={onChange}
          />
        </FilterContainer>
      );

    case "text":
      return (
        <FilterContainer>
          <FilterLabel>{filter.label}</FilterLabel>
          <FilterInput
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Buscar ${filter.label.toLowerCase()}...`}
          />
        </FilterContainer>
      );

    default:
      return null;
  }
};

export default FilterRenderer;
