import { IFilterConfig } from "@/components/filters/types";

interface IFilterRendererProps {
    filter: IFilterConfig;
    value: unknown;
    onChange: (value: unknown) => void;
}

export type { IFilterRendererProps };
