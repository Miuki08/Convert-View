import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface SwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigationStyleChange: (style: string) => void;
  currentNavigationStyle: string;
  onHeaderStyleChange: (style: string) => void;
  currentHeaderStyle: string;
  onDirectionChange: (direction: 'ltr' | 'rtl') => void;
  currentDirection: 'ltr' | 'rtl';
  onLayoutChange: (layout: 'vertical' | 'horizontal') => void;
  currentLayout: 'vertical' | 'horizontal';
}

const Switcher: React.FC<SwitcherProps> = ({ 
  isOpen, 
  onClose, 
  onNavigationStyleChange,
  currentNavigationStyle,
  onHeaderStyleChange,
  currentHeaderStyle,
  onDirectionChange,
  currentDirection,
  onLayoutChange,
  currentLayout
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  const resetSettings = () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('sidebarCollapsed');
    localStorage.removeItem('navigationStyle');
    localStorage.removeItem('headerStyle');
    localStorage.removeItem('direction');
    localStorage.removeItem('layout');
    window.location.reload();
  };

  if (!isVisible) return null;

  // Color palette options
  const colorOptions = [
    { id: 'default', name: 'Default', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' },
    { id: 'yellow', name: 'Yellow', color: 'bg-yellow-500' },
    { id: 'indigo', name: 'Indigo', color: 'bg-indigo-500' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Switcher Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Theme Switcher</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex" role="tablist">
                <button 
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveTab('home')}
                >
                  Theme Styles
                </button>
                <button 
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Theme Colors
                </button>
              </div>
            </nav>
            
            <div className="p-4">
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Theme Mode */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Theme Mode</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-white rounded-md shadow-inner mb-2"></div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${theme === 'light' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Light</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md shadow-inner mb-2"></div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${theme === 'dark' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Dark</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Layout Direction */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Direction</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentDirection === 'ltr' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onDirectionChange('ltr')}
                      >
                        <div className="flex items-center justify-center h-20 mb-2">
                          <div className="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-start p-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentDirection === 'ltr' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">LTR</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentDirection === 'rtl' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onDirectionChange('rtl')}
                      >
                        <div className="flex items-center justify-center h-20 mb-2">
                          <div className="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-end p-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentDirection === 'rtl' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">RTL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Style */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Navigation Style</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentLayout === 'vertical' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onLayoutChange('vertical')}
                      >
                        <div className="flex h-20 mb-2">
                          <div className="w-6 h-full bg-blue-500 rounded-l"></div>
                          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-r"></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentLayout === 'vertical' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Vertical</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentLayout === 'horizontal' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onLayoutChange('horizontal')}
                      >
                        <div className="h-20 mb-2">
                          <div className="w-full h-6 bg-blue-500 rounded-t"></div>
                          <div className="w-full h-14 bg-gray-100 dark:bg-gray-700 rounded-b"></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentLayout === 'horizontal' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Horizontal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Color Palette */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Color Palette</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {colorOptions.map((color) => (
                        <div key={color.id} className="flex flex-col items-center">
                          <div className={`w-10 h-10 ${color.color} rounded-full cursor-pointer mb-1 shadow-md hover:shadow-lg transition-shadow`}></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Menu Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Menu Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      <div 
                        className={`w-8 h-8 bg-white border rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentNavigationStyle === 'light' ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200 dark:border-gray-600'
                        }`} 
                        onClick={() => onNavigationStyleChange('light')}
                        title="Light Menu"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-gray-800 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentNavigationStyle === 'dark' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onNavigationStyleChange('dark')}
                        title="Dark Menu"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-blue-500 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentNavigationStyle === 'primary' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onNavigationStyleChange('primary')}
                        title="Primary Menu"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentNavigationStyle === 'gradient' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onNavigationStyleChange('gradient')}
                        title="Gradient Menu"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-transparent border rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentNavigationStyle === 'transparent' ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                        }`} 
                        onClick={() => onNavigationStyleChange('transparent')}
                        title="Transparent Menu"
                      ></div>
                    </div>
                  </div>

                  {/* Header Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Header Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      <div 
                        className={`w-8 h-8 bg-white border border-gray-200 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentHeaderStyle === 'light' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onHeaderStyleChange('light')}
                        title="Light Header"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-gray-800 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentHeaderStyle === 'dark' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onHeaderStyleChange('dark')}
                        title="Dark Header"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-blue-500 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentHeaderStyle === 'primary' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onHeaderStyleChange('primary')}
                        title="Primary Header"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              onClick={resetSettings}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Switcher;