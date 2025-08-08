import { IFilterConfig } from "@/components/filters/types";
import Badge from "../ui/badge/styles";
import {
  FiltersContainer,
  Header,
  Title,
  FiltersContent,
  FilterActions,
} from "./styles";
import Collapsible from "@/components/ui/collapsible";
import { useCollapsible } from "@/contexts/CollapsibleContext";
import Button from "../ui/button";
import { useFilters } from "@/hooks/useFilters";
import FilterRenderer from "@/components/ui/filter/FilterRenderer";
import { useEffect, useRef } from "react";

interface IFiltersProps {
  filters: IFilterConfig[];
  onFiltersChange: (filters: Record<string, unknown>) => void;
}

const Filters: React.FC<IFiltersProps> = ({ filters, onFiltersChange }) => {
  const { isOpen } = useCollapsible();
  const hasAppliedInitialFilters = useRef(false);

  const {
    pendingFilters,
    updateRangeFilter,
    updateSelectFilter,
    updateCheckboxFilter,
    updateTextFilter,
    applyFilters,
    resetFilters,
    hasPendingChanges,
    getActiveFiltersCount,
    getFilterConfig,
    initialFilters,
    appliedFilters,
  } = useFilters({
    filters,
    onFiltersChange,
    storageKey: "property-filters",
  });

  useEffect(() => {
    if (hasAppliedInitialFilters.current) return;

    const hasActiveFilters = Object.entries(appliedFilters).some(
      ([key, value]) => {
        const filter = filters.find((f) => f.id === key);
        if (!filter) return false;

        switch (filter.type) {
          case "range":
            const rangeValue = value as { min: number; max: number };
            return (
              rangeValue.min !== (filter.min || 0) ||
              rangeValue.max !== (filter.max || 100)
            );
          case "select":
            return value !== filter.defaultValue && value !== "";
          case "checkbox":
            return (value as string[]).length > 0;
          case "text":
            return value !== filter.defaultValue && value !== "";
          default:
            return false;
        }
      }
    );

    if (hasActiveFilters) {
      const where = Object.entries(appliedFilters).reduce(
        (acc: Record<string, unknown>, [key, value]) => {
          if (value === "" || (Array.isArray(value) && value.length === 0)) {
            return acc;
          }

          const filter = filters.find((f) => f.id === key);
          if (!filter) return acc;

          switch (filter.type) {
            case "range":
              const rangeValue = value as { min: number; max: number };
              return {
                ...acc,
                [key]: { min: rangeValue.min, max: rangeValue.max },
              };
            case "select":
            case "checkbox":
            case "text":
              return { ...acc, [key]: value };
            default:
              return acc;
          }
        },
        {}
      );

      onFiltersChange(where);
    }

    hasAppliedInitialFilters.current = true;
  }, [appliedFilters, filters, onFiltersChange]);

  const handleFilterChange = (filterId: string, value: unknown) => {
    const filter = getFilterConfig(filterId);
    if (!filter) return;

    switch (filter.type) {
      case "range":
        const rangeValue = value as { min: number; max: number };
        updateRangeFilter(filterId, rangeValue.min, rangeValue.max);
        break;
      case "select":
        updateSelectFilter(filterId, value as string | number);
        break;
      case "checkbox":
        updateCheckboxFilter(filterId, value as string[]);
        break;
      case "text":
        updateTextFilter(filterId, value as string);
        break;
    }
  };

  return (
    <FiltersContainer $isOpen={isOpen}>
      <Collapsible isOpen={isOpen}>
        <Header>
          <Title>
            Filtros
            {isOpen && (
              <div className="badge-container">
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount(initialFilters) > 0
                    ? `${getActiveFiltersCount(initialFilters)} Filtros activos`
                    : "Filtros"}
                </Badge>
              </div>
            )}
          </Title>
        </Header>
        <FiltersContent $isOpen={isOpen}>
          {filters.map((filter) => (
            <FilterRenderer
              key={filter.id}
              filter={filter}
              value={pendingFilters[filter.id]}
              onChange={(value) => handleFilterChange(filter.id, value)}
            />
          ))}
          <FilterActions>
            <Button
              variant="primary"
              onClick={applyFilters}
              disabled={!hasPendingChanges()}
            >
              Aplicar filtros
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              Limpiar filtros
            </Button>
          </FilterActions>
        </FiltersContent>
      </Collapsible>
    </FiltersContainer>
  );
};

export default Filters;
