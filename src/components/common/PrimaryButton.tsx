import { usePrimaryColor } from '../hooks/usePrimaryColor';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'theme';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}) => {
  const { 
    getColorClasses, 
    getTextColorForBackground,
    getThemeBackgroundValue,
    getTextColorForThemeBackground
  } = usePrimaryColor();
  
  let bgClass: string;
  let textColorClass: string;
  
  if (variant === 'primary') {
    bgClass = getColorClasses('bg');
    textColorClass = getTextColorForBackground(bgClass);
  } else if (variant === 'theme') {
    bgClass = getThemeBackgroundValue();
    textColorClass = getTextColorForThemeBackground();
  } else {
    // Secondary variant
    bgClass = 'bg-gray-200 dark:bg-gray-700';
    textColorClass = 'text-gray-800 dark:text-gray-200';
  }
  
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all duration-200
        ${bgClass} 
        ${textColorClass}
        hover:opacity-90 transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${getColorClasses('ring')}
        ${className}
      `}
    >
      {children}
    </button>
  );
};