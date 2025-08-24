// hooks/usePrimaryColor.ts
"use client";

import { useTheme } from '../common/ThemeContext';

export const usePrimaryColor = () => {
  const { primaryColor } = useTheme();
  
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
  
  // Function to determine text color based on background
  const getTextColorForBackground = (bgColorClass: string) => {
    const lightTextColors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500',
      'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600'
    ];
    
    const darkTextColors = [
      'bg-yellow-500', 'bg-yellow-400', 'bg-gray-100', 'bg-white'
    ];
    
    if (lightTextColors.includes(bgColorClass)) {
      return 'text-white';
    } else if (darkTextColors.includes(bgColorClass)) {
      return 'text-gray-900';
    }
    
    return 'text-white';
  };
  
  return {
    primaryColor,
    getColorClasses,
    getTextColorForBackground
  };
};