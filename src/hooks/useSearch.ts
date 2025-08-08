import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getFromStorage, setToStorage } from '@/utils/storage';

export interface IUseSearchProps {
  onSearchChange?: (query: string) => void;
  storageKey?: string;
}

export const useSearch = ({ 
  onSearchChange,
  storageKey = 'property-search'
}: IUseSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  const lastSearchQuery = useRef<string>('');

  const loadInitialSearch = useCallback(() => {
    if (searchParams) {
      const urlSearch = searchParams.get('q');
      if (urlSearch) {
        return urlSearch;
      }
    }

    return getFromStorage(storageKey) || '';
  }, [searchParams, storageKey]);

  const [searchQuery, setSearchQuery] = useState(() => loadInitialSearch());

  const updateURL = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    const currentURL = window.location.search;
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    
    if (currentURL !== newURL) {
      router.replace(newURL, { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    if (searchQuery !== lastSearchQuery.current) {
      lastSearchQuery.current = searchQuery;
      updateURL(searchQuery);
      setToStorage(storageKey, searchQuery);
    }
  }, [searchQuery, updateURL, storageKey]);

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearchChange?.(query);
  }, [onSearchChange]);

  const clearSearch = useCallback(() => {
    updateSearch('');
  }, [updateSearch]);

  return {
    searchQuery,
    updateSearch,
    clearSearch
  };
};
