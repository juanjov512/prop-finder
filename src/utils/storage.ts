export const isClient = typeof window !== 'undefined';

export const getFromStorage = (key: string): string | null => {
  if (!isClient) return null;
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Error getting item from localStorage (${key}):`, error);
    return null;
  }
};

export const setToStorage = (key: string, value: string): void => {
  if (!isClient) return;
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Error setting item to localStorage (${key}):`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  if (!isClient) return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing item from localStorage (${key}):`, error);
  }
};

export const getJSONFromStorage = <T>(key: string, defaultValue: T): T => {
  const stored = getFromStorage(key);
  if (!stored) return defaultValue;
  
  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    console.warn(`Error parsing JSON from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const setJSONToStorage = <T>(key: string, value: T): void => {
  try {
    const jsonString = JSON.stringify(value);
    setToStorage(key, jsonString);
  } catch (error) {
    console.warn(`Error stringifying JSON for localStorage (${key}):`, error);
  }
};
