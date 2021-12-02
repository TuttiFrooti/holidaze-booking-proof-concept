import { useState } from 'react';

export default function useLocalStorage(key, initValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (err) {
      console.error(err);
      return initValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error(err);
    }
  };

  const removeValue = key => {
    try {
      setStoredValue(null);
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }

  return [storedValue, setValue, removeValue];
}