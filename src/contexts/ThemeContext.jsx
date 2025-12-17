// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Créer le contexte
const ThemeContext = createContext();

// 2. Hook personnalisé pour utiliser le contexte
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
}

// 3. Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Récupérer le thème du localStorage
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', theme);

    // Appliquer le thème au body
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
