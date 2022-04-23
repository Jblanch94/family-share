import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      const currentValue = localStorage.getItem(key);
      if (currentValue) {
        return JSON.parse(currentValue);
      }

      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === null) localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
