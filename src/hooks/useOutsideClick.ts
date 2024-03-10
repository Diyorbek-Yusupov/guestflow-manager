import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
  capturingPhase: boolean = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick, capturingPhase);
    return () =>
      document.removeEventListener('click', handleClick, capturingPhase);
  }, [callback, capturingPhase]);

  return ref;
}
