import { useState, useCallback } from "react";

export const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      const timeout = setTimeout(() => {
        callback(...args);
      }, delay);
      setDebounceTimeout(timeout);
    },
    [callback, delay, debounceTimeout]
  );

  return debouncedCallback;
};

export default function Debouncer(){
  // You can use the useDebounce hook here if needed
};