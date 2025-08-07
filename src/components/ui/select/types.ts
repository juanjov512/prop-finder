import { IFilterOption } from "@/components/filters/types";

interface ISelectProps {
  options: IFilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface IStyledSelectProps {
    isOpen: boolean;
}

interface IStyledSelectOptionProps {
    isSelected: boolean;
}


export type { ISelectProps, IStyledSelectProps, IStyledSelectOptionProps };
