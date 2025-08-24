// components/ui/PrimaryButton.tsx
import { usePrimaryColor } from '../hooks/usePrimaryColor';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  className = '' 
}) => {
  const { getColorClasses, getTextColorForBackground } = usePrimaryColor();
  
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all duration-200
        ${getColorClasses('bg')} 
        ${getTextColorForBackground(getColorClasses('bg'))}
        hover:opacity-90 transform hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
};