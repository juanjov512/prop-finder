import { useState, useCallback, useMemo } from 'react';
import { IFilterConfig } from '@/components/filters/types';
import { PropertiesQueryVariables } from '@/gql/graphql';


export interface FilterState {
  [key: string]: unknown;
}

export interface UseFiltersProps {
  filters: IFilterConfig[];
  onFiltersChange?: (filters: FilterState) => void;
}

export const useFilters = ({ filters: initialFilters, onFiltersChange }: UseFiltersProps) => {
  // Initialize filter state based on filter configurations
  const initialFilterState = useMemo(() => {
    const initialState: FilterState = {};
    initialFilters.forEach(filter => {
      switch (filter.type) {
        case 'range':
          initialState[filter.id] = {
            min: filter.min || 0,
            max: filter.max || 100
          };
          break;
        case 'select':
          initialState[filter.id] = filter.defaultValue || '';
          break;
        case 'checkbox':
          initialState[filter.id] = filter.defaultValue || [];
          break;
        case 'text':
          initialState[filter.id] = filter.defaultValue || '';
          break;
      }
    });
    return initialState;
  }, [initialFilters]);

  // Estado de filtros pendientes (lo que ve el usuario)
  const [pendingFilters, setPendingFilters] = useState<FilterState>(initialFilterState);
  
  // Estado de filtros aplicados (lo que se usa para filtrar)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilterState);

  // Update a specific filter (solo actualiza el estado pendiente)
  const updateFilter = useCallback((filterId: string, value: unknown) => {
    setPendingFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  }, []);

  // Update range filter
  const updateRangeFilter = useCallback((filterId: string, min: number, max: number) => {
    updateFilter(filterId, { min, max });
  }, [updateFilter]);

  // Update select filter
  const updateSelectFilter = useCallback((filterId: string, value: string | number) => {
    updateFilter(filterId, value);
  }, [updateFilter]);

  // Update checkbox filter
  const updateCheckboxFilter = useCallback((filterId: string, values: string[]) => {
    updateFilter(filterId, values);
  }, [updateFilter]);

  // Update text filter
  const updateTextFilter = useCallback((filterId: string, value: string) => {
    updateFilter(filterId, value);
  }, [updateFilter]);

  // Aplicar filtros solo si realmente cambiaron
  const applyFilters = useCallback(() => {
    if (JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters)) {
      setAppliedFilters(pendingFilters);

      const where = Object.entries(pendingFilters).reduce((acc: PropertiesQueryVariables, [key, value]) => {
        if (value === '' || (Array.isArray(value) && value.length === 0)) {
          return acc;
        }

        const filter = initialFilters.find(f => f.id === key);
        if (!filter) return acc;

        switch (filter.type) {
          case 'range':
            const rangeValue = value as { min: number; max: number };
            return { ...acc, [key]: { min: rangeValue.min, max: rangeValue.max } };
          case 'select':
          case 'checkbox':
          case 'text':
            return { ...acc, [key]: value };
          default:
            return acc;
        }
      }, {} as PropertiesQueryVariables);

      onFiltersChange?.(where);
    }
  }, [pendingFilters, appliedFilters, onFiltersChange, initialFilters]);

  // Resetear filtros solo si realmente cambiaron
  const resetFilters = useCallback(() => {
    if (JSON.stringify(appliedFilters) !== JSON.stringify(initialFilterState)) {
      setPendingFilters(initialFilterState);
      setAppliedFilters(initialFilterState);
      onFiltersChange?.(initialFilterState);
    }
  }, [appliedFilters, initialFilterState, onFiltersChange]);

  // Check if there are pending changes
  const hasPendingChanges = useCallback(() => {
    return JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);
  }, [pendingFilters, appliedFilters]);

  // Get active filters count (basado en filtros aplicados)
  const getActiveFiltersCount = useCallback((filters: IFilterConfig[]) => {
    return Object.entries(appliedFilters).reduce((count, [key, value]) => {
      const filter = filters.find(f => f.id === key);
      if (!filter) return count;

      switch (filter.type) {
        case 'range':
          const rangeValue = value as { min: number; max: number };
          if (rangeValue.min !== filter.min || rangeValue.max !== filter.max) {
            return count + 1;
          }
          break;
        case 'select':
          if (value !== filter.defaultValue && value !== '') {
            return count + 1;
          }
          break;
        case 'checkbox':
          const checkboxValue = value as string[];
          if (checkboxValue.length > 0) {
            return count + 1;
          }
          break;
        case 'text':
          if (value !== filter.defaultValue && value !== '') {
            return count + 1;
          }
          break;
      }
      return count;
    }, 0);
  }, [appliedFilters]);

  // Get filter configuration by ID
  const getFilterConfig = useCallback((filterId: string) => {
    return initialFilters.find(filter => filter.id === filterId);
  }, [initialFilters]);

  return {
    // Estados
    pendingFilters,      // Filtros que ve el usuario (pendientes de aplicar)
    appliedFilters,      // Filtros que están realmente aplicados
    
    // Funciones de actualización (solo afectan filtros pendientes)
    updateFilter,
    updateRangeFilter,
    updateSelectFilter,
    updateCheckboxFilter,
    updateTextFilter,
    
    // Funciones de control
    applyFilters,        // Aplica los filtros pendientes
    resetFilters,        // Limpia todos los filtros
    
    // Utilidades
    hasPendingChanges,   // Verifica si hay cambios pendientes
    getActiveFiltersCount,
    getFilterConfig,
    initialFilters
  };
};