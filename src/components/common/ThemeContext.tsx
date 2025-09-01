"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  primaryColor: string;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  themeBackground: string;
  setThemeBackground: (color: string) => void;
  menuBackground: string;
  setMenuBackground: (bg: string) => void;
  isInitialized: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Jika context belum di-initialize, throw error khusus
  if (!context.isInitialized) {
    throw new Error('Theme context is not yet initialized');
  }
  
  return context;
};

// Safe version yang tidak throw error selama initialization
export const useThemeSafe = () => {
  const context = useContext(ThemeContext);
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [themeBackground, setThemeBackground] = useState('primary-1');
  const [menuBackground, setMenuBackground] = useState('bg-1');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Client-side initialization
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme');
        const savedPrimaryColor = localStorage.getItem('primaryColor');
        const savedThemeBackground = localStorage.getItem('themeBackground');
        const savedMenuBackground = localStorage.getItem('menuBackground');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Apply theme
        const appliedTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark) ? 'dark' : 'light';
        setTheme(appliedTheme);
        document.documentElement.classList.toggle('dark', appliedTheme === 'dark');
        
        // Apply primary color
        const appliedPrimaryColor = savedPrimaryColor || 'blue';
        setPrimaryColor(appliedPrimaryColor);
        updateCssVariable(appliedPrimaryColor);
        
        // Apply other settings
        if (savedThemeBackground) setThemeBackground(savedThemeBackground);
        if (savedMenuBackground) setMenuBackground(savedMenuBackground);
        
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback values
        setTheme('light');
        setPrimaryColor('blue');
        updateCssVariable('blue');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeTheme();
  }, []);

  const updateCssVariable = (color: string) => {
    const colorValues: Record<string, string> = {
      blue: '59 130 246',
      purple: '139 92 246',
      green: '34 197 94',
      yellow: '234 179 8',
      red: '239 68 68'
    };
    
    document.documentElement.style.setProperty('--color-primary', colorValues[color] || '59 130 246');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const updatePrimaryColor = (color: string) => {
    setPrimaryColor(color);
    updateCssVariable(color);
    localStorage.setItem('primaryColor', color);
  };

  const updateThemeBackground = (color: string) => {
    setThemeBackground(color);
    localStorage.setItem('themeBackground', color);
  };

  const updateMenuBackground = (bg: string) => {
    setMenuBackground(bg);
    localStorage.setItem('menuBackground', bg);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    primaryColor,
    toggleTheme,
    setPrimaryColor: updatePrimaryColor,
    themeBackground,
    setThemeBackground: updateThemeBackground,
    menuBackground,
    setMenuBackground: updateMenuBackground,
    isInitialized
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};