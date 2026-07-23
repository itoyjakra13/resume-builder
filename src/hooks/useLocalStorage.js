import { useState, useEffect, useRef } from 'react';

export function useLocalStorage(key, initialValue) {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const isFirstRender = useRef(true);

  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        const newValueStr = JSON.stringify(storedValue);
        const existingValueStr = window.localStorage.getItem(key);
        
        // Only perform write if actual content changed
        if (newValueStr !== existingValueStr) {
          window.localStorage.setItem(key, newValueStr);
        }
      } catch (error) {
        console.error('Error setting localStorage key:', key, error);
      } finally {
        setSaveStatus('saved');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [key, storedValue]);

  return [storedValue, setStoredValue, saveStatus];
}

