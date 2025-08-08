import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IPropertyFilters } from '@/hooks/usePropertyFilters';

interface IUseURLFiltersOptions {
  filters: IPropertyFilters;
  searchQuery: string;
  onFiltersChange: (filters: IPropertyFilters) => void;
  onSearchChange: (query: string) => void;
}

export const useURLFilters = ({
  filters,
  searchQuery,
  onFiltersChange,
  onSearchChange
}: IUseURLFiltersOptions) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtersToURL = useCallback((filters: IPropertyFilters, search: string) => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('q', search);
    }
    
    if (filters.price && filters.price.min > 0) {
      params.set('minPrice', filters.price.min.toString());
    }
    
    if (filters.price && filters.price.max < 1000000000) {
      params.set('maxPrice', filters.price.max.toString());
    }
    
    if (filters.types && filters.types.length > 0) {
      params.set('types', filters.types.join(','));
    }
    
    if (filters.bedrooms && filters.bedrooms > 0) {
      params.set('bedrooms', filters.bedrooms.toString());
    }
    
    if (filters.bathrooms && filters.bathrooms > 0) {
      params.set('bathrooms', filters.bathrooms.toString());
    }
    
    return params.toString();
  }, []);

  const urlToFilters = useCallback((): { filters: IPropertyFilters; search: string } => {
    if (!searchParams) {
      return { 
        filters: {
          price: { min: 0, max: 1000000000 },
          types: [],
          bedrooms: 0,
          bathrooms: 0
        },
        search: ''
      };
    }
    
    const search = searchParams.get('q') || '';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '1000000000');
    const types = searchParams.get('types')?.split(',').filter(Boolean) || [];
    const bedrooms = parseInt(searchParams.get('bedrooms') || '0');
    const bathrooms = parseInt(searchParams.get('bathrooms') || '0');

    return {
      filters: {
        price: { min: minPrice, max: maxPrice },
        types,
        bedrooms,
        bathrooms
      },
      search
    };
  }, [searchParams]);

  useEffect(() => {
    const { filters: urlFilters, search: urlSearch } = urlToFilters();
    const urlHasFilters = (
      urlSearch ||
      (urlFilters.price && urlFilters.price.min > 0) ||
      (urlFilters.price && urlFilters.price.max < 1000000000) ||
      (urlFilters.types && urlFilters.types.length > 0) ||
      (urlFilters.bedrooms && urlFilters.bedrooms > 0) ||
      (urlFilters.bathrooms && urlFilters.bathrooms > 0)
    );
    if (urlHasFilters) {
      onFiltersChange(urlFilters);
      onSearchChange(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const urlParams = filtersToURL(filters, searchQuery);
    const currentURL = window.location.search;
    const newURL = urlParams ? `?${urlParams}` : window.location.pathname;
    
    if (currentURL !== newURL) {
      router.replace(newURL, { scroll: false });
    }
  }, [filters, searchQuery, filtersToURL, router]);

  return {
    urlToFilters
  };
}; 