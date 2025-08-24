// contexts/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  primaryColor: string;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
    
    if (savedPrimaryColor) {
      setPrimaryColor(savedPrimaryColor);
      updateCssVariable(savedPrimaryColor);
    }
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
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const updatePrimaryColor = (color: string) => {
    setPrimaryColor(color);
    updateCssVariable(color);
    localStorage.setItem('primaryColor', color);
  };

  // Untuk menghindari hydration mismatch, render children hanya setelah mount
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      primaryColor, 
      toggleTheme, 
      setPrimaryColor: updatePrimaryColor 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};