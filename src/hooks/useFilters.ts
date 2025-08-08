import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { IFilterConfig } from '@/components/filters/types';
import { PropertiesQueryVariables } from '@/gql/graphql';
import { useSearchParams, useRouter } from 'next/navigation';
import { getJSONFromStorage, setJSONToStorage } from '@/utils/storage';

export interface FilterState {
  [key: string]: unknown;
}

export interface UseFiltersProps {
  filters: IFilterConfig[];
  onFiltersChange?: (filters: FilterState) => void;
  storageKey?: string;
}

export const useFilters = ({ 
  filters: initialFilters, 
  onFiltersChange,
  storageKey = 'property-filters'
}: UseFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  const lastAppliedFilters = useRef<string>('');

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

  const loadInitialFilters = useCallback(() => {
    if (searchParams) {
      const urlFilters: FilterState = { ...initialFilterState };
      let hasURLFilters = false;
      
      initialFilters.forEach(filter => {
        switch (filter.type) {
          case 'range':
            const minParam = searchParams.get(`${filter.id}Min`);
            const maxParam = searchParams.get(`${filter.id}Max`);
            if (minParam || maxParam) {
              urlFilters[filter.id] = {
                min: minParam ? parseInt(minParam) : (filter.min || 0),
                max: maxParam ? parseInt(maxParam) : (filter.max || 100)
              };
              hasURLFilters = true;
            }
            break;
          case 'select':
            const selectParam = searchParams.get(filter.id);
            if (selectParam) {
              urlFilters[filter.id] = selectParam;
              hasURLFilters = true;
            }
            break;
          case 'checkbox':
            const checkboxParam = searchParams.get(filter.id);
            if (checkboxParam) {
              urlFilters[filter.id] = checkboxParam.split(',').filter(Boolean);
              hasURLFilters = true;
            }
            break;
          case 'text':
            const textParam = searchParams.get(filter.id);
            if (textParam) {
              urlFilters[filter.id] = textParam;
              hasURLFilters = true;
            }
            break;
        }
      });

      if (hasURLFilters) {
        return urlFilters;
      }
    }

    return getJSONFromStorage<FilterState>(storageKey, initialFilterState);
  }, [searchParams, initialFilters, initialFilterState, storageKey]);

  const [pendingFilters, setPendingFilters] = useState<FilterState>(() => loadInitialFilters());
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(() => loadInitialFilters());

  const updateURL = useCallback((filters: FilterState) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value === '' || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      const filter = initialFilters.find(f => f.id === key);
      if (!filter) return;

      switch (filter.type) {
        case 'range':
          const rangeValue = value as { min: number; max: number };
          if (rangeValue.min > (filter.min || 0)) {
            params.set(`${key}Min`, rangeValue.min.toString());
          }
          if (rangeValue.max < (filter.max || 100)) {
            params.set(`${key}Max`, rangeValue.max.toString());
          }
          break;
        case 'select':
          if (value !== filter.defaultValue && value !== '') {
            params.set(key, value as string);
          }
          break;
        case 'checkbox':
          const checkboxValue = value as string[];
          if (checkboxValue.length > 0) {
            params.set(key, checkboxValue.join(','));
          }
          break;
        case 'text':
          if (value !== filter.defaultValue && value !== '') {
            params.set(key, value as string);
          }
          break;
      }
    });
    
    const currentURL = window.location.search;
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    
    if (currentURL !== newURL) {
      router.replace(newURL, { scroll: false });
    }
  }, [initialFilters, router]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    const filtersString = JSON.stringify(appliedFilters);
    if (filtersString !== lastAppliedFilters.current) {
      lastAppliedFilters.current = filtersString;
      updateURL(appliedFilters);
      setJSONToStorage(storageKey, appliedFilters);
    }
  }, [appliedFilters, updateURL, storageKey]);

  const updateFilter = useCallback((filterId: string, value: unknown) => {
    setPendingFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  }, []);

  const updateRangeFilter = useCallback((filterId: string, min: number, max: number) => {
    updateFilter(filterId, { min, max });
  }, [updateFilter]);

  const updateSelectFilter = useCallback((filterId: string, value: string | number) => {
    updateFilter(filterId, value);
  }, [updateFilter]);

  const updateCheckboxFilter = useCallback((filterId: string, values: string[]) => {
    updateFilter(filterId, values);
  }, [updateFilter]);

  const updateTextFilter = useCallback((filterId: string, value: string) => {
    updateFilter(filterId, value);
  }, [updateFilter]);

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

  const resetFilters = useCallback(() => {
    if (JSON.stringify(appliedFilters) !== JSON.stringify(initialFilterState)) {
      setPendingFilters(initialFilterState);
      setAppliedFilters(initialFilterState);
      onFiltersChange?.(initialFilterState);
    }
  }, [appliedFilters, initialFilterState, onFiltersChange]);

  const hasPendingChanges = useCallback(() => {
    return JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);
  }, [pendingFilters, appliedFilters]);

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

  const getFilterConfig = useCallback((filterId: string) => {
    return initialFilters.find(filter => filter.id === filterId);
  }, [initialFilters]);

  return {
    pendingFilters,
    appliedFilters,
    updateFilter,
    updateRangeFilter,
    updateSelectFilter,
    updateCheckboxFilter,
    updateTextFilter,
    applyFilters,
    resetFilters,
    hasPendingChanges,
    getActiveFiltersCount,
    getFilterConfig,
    initialFilters
  };
};