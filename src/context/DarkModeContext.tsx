import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

interface IDarkModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface IDarkModeProviderProps {
  children: React.ReactNode;
}

const DarkModeContext = createContext({} as IDarkModeContext);

function DarkModeProvider({ children }: IDarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext used outside of its Provider');
  return context;
}

export { DarkModeProvider, useDarkMode };
