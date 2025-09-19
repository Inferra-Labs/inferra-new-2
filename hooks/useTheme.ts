import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for a saved theme in localStorage, defaulting to 'light'.
    // This ensures persistence across page reloads.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'light';
  });

  useEffect(() => {
    // This effect runs whenever the theme changes.
    // 1. It removes old theme classes to prevent conflicts.
    // 2. It adds the current theme class to the root <html> element for Tailwind CSS and to the <body> for custom styles.
    // 3. It saves the new theme value to localStorage.
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // A memoized function to toggle the theme between light and dark.
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
};
