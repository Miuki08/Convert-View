"use client";

import { useThemeSafe } from '../common/ThemeContext';

export const usePrimaryColor = () => {
  const themeContext = useThemeSafe();

  const primaryColor = themeContext?.primaryColor || 'blue';
  const themeBackground = themeContext?.themeBackground || 'primary-1';
  
  // Return color classes based on primary color
 const getColorClasses = (type: 'bg' | 'text' | 'border' | 'hover' | 'ring') => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-500',
        border: 'border-blue-500',
        hover: 'hover:bg-blue-600',
        ring: 'ring-blue-500'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        border: 'border-purple-500',
        hover: 'hover:bg-purple-600',
        ring: 'ring-purple-500'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-500',
        border: 'border-green-500',
        hover: 'hover:bg-green-600',
        ring: 'ring-green-500'
      },
      yellow: {
        bg: 'bg-yellow-500',
        text: 'text-yellow-500',
        border: 'border-yellow-500',
        hover: 'hover:bg-yellow-600',
        ring: 'ring-yellow-500'
      },
      red: {
        bg: 'bg-red-500',
        text: 'text-red-500',
        border: 'border-red-500',
        hover: 'hover:bg-red-600',
        ring: 'ring-red-500'
      }
    };
    
    return colorMap[primaryColor]?.[type] || colorMap.blue[type];
  };
  
  // Function to determine text color based on background color value (not class)
  const getTextColorForBackground = (bgColorValue: string) => {
    // Extract the actual color from class names like 'bg-blue-500'
    const getColorFromClass = (colorClass: string) => {
      const match = colorClass.match(/bg-(.+)-(\d+)/);
      if (match) return { color: match[1], shade: parseInt(match[2]) };
      return null;
    };
    
    const colorInfo = getColorFromClass(bgColorValue);
    if (!colorInfo) return 'text-gray-800'; // Default
    
    const { color, shade } = colorInfo;
    
    // Colors that need light text (dark backgrounds)
    const darkColors = ['blue', 'purple', 'green', 'red', 'gray', 'black'];
    const needsLightText = 
      (darkColors.includes(color) && shade >= 500) || 
      (color === 'gray' && shade >= 700) ||
      color === 'black';
    
    // Colors that need dark text (light backgrounds)
    const lightColors = ['yellow', 'white'];
    const needsDarkText = 
      (lightColors.includes(color) && shade <= 500) || 
      (color === 'gray' && shade <= 400) ||
      color === 'white';
    
    if (needsLightText) return 'text-white';
    if (needsDarkText) return 'text-gray-900';
    
    return 'text-gray-800'; // Default
  };
  
  // Get the actual color value from theme background
  const getThemeBackgroundValue = () => {
    const backgroundMap: Record<string, string> = {
      'primary-1': getColorClasses('bg'),
      'primary-2': 'bg-purple-500',
      'primary-3': 'bg-green-500',
      'primary-4': 'bg-yellow-500',
      'primary-5': 'bg-red-500',
      'bg-1': 'bg-gray-100',
      'bg-2': 'bg-gray-200',
      'bg-3': 'bg-gray-300',
      'bg-4': 'bg-gray-400',
      'bg-5': 'bg-gray-500'
    };
    
    return backgroundMap[themeBackground] || getColorClasses('bg');
  };
  
  // Helper to get text color for theme background
  const getTextColorForThemeBackground = () => {
    const bgClass = getThemeBackgroundValue();
    return getTextColorForBackground(bgClass);
  };
  
  return {
    primaryColor,
    themeBackground,
    getColorClasses,
    getTextColorForBackground,
    getThemeBackgroundValue,
    getTextColorForThemeBackground
  };
};