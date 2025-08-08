import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getJSONFromStorage, setJSONToStorage, getFromStorage, setToStorage } from '@/utils/storage';

export interface UsePersistentStateOptions<T> {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  urlParam?: string;
  onValueChange?: (value: T) => void;
}

export const usePersistentState = <T>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  urlParam,
  onValueChange
}: UsePersistentStateOptions<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loadFromStorage = useCallback(() => {
    if (typeof serialize === 'function' && typeof deserialize === 'function') {
      return getJSONFromStorage<T>(key, defaultValue);
    } else {
      const stored = getFromStorage(key);
      return stored ? deserialize(stored) : defaultValue;
    }
  }, [key, defaultValue, serialize, deserialize]);

  const saveToStorage = useCallback((value: T) => {
    if (typeof serialize === 'function' && typeof deserialize === 'function') {
      setJSONToStorage(key, value);
    } else {
      setToStorage(key, serialize(value));
    }
  }, [key, serialize, deserialize]);

  const loadFromURL = useCallback(() => {
    if (!urlParam || !searchParams) return defaultValue;
    const urlValue = searchParams.get(urlParam);
    return urlValue ? deserialize(urlValue) : defaultValue;
  }, [urlParam, searchParams, defaultValue, deserialize]);

  const updateURL = useCallback((value: T) => {
    if (!urlParam) return;
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    const serializedValue = serialize(value);
    
    if (serializedValue && serializedValue !== serialize(defaultValue)) {
      params.set(urlParam, serializedValue);
    } else {
      params.delete(urlParam);
    }
    
    const currentURL = window.location.search;
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    
    if (currentURL !== newURL) {
      router.replace(newURL, { scroll: false });
    }
  }, [urlParam, searchParams, serialize, defaultValue, router]);

  const loadInitialValue = useCallback(() => {
    const urlValue = loadFromURL();
    if (urlValue !== defaultValue) {
      return urlValue;
    }

    return loadFromStorage();
  }, [loadFromURL, loadFromStorage, defaultValue]);

  const [value, setValue] = useState<T>(() => loadInitialValue());

  useEffect(() => {
    if (urlParam) {
      updateURL(value);
    }
  }, [value, urlParam, updateURL]);

  useEffect(() => {
    saveToStorage(value);
  }, [value, saveToStorage]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    onValueChange?.(newValue);
  }, [onValueChange]);

  return {
    value,
    setValue: updateValue
  };
};
