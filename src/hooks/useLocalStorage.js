import { useState, useEffect } from 'react';
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(`sela-v1-${key}`); return saved ? JSON.parse(saved) : initialValue; }
    catch { return initialValue; }
  });
  useEffect(() => { try { localStorage.setItem(`sela-v1-${key}`, JSON.stringify(value)); } catch { /* Storage may be unavailable in private browsing. */ } }, [key, value]);
  return [value, setValue];
}
