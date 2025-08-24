import React, { useState, useEffect } from 'react';
import { useTheme } from '../common/ThemeContext';

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
  onThemeChange: (theme: 'light' | 'dark') => void;
  currentTheme: 'light' | 'dark';
  onMenuStyleChange: (style: string) => void;
  currentMenuStyle: string;
  onSidemenuLayoutChange: (layout: string) => void;
  currentSidemenuLayout: string;
  onPageStyleChange: (style: string) => void;
  currentPageStyle: string;
  onLayoutWidthChange: (width: string) => void;
  currentLayoutWidth: string;
  onMenuPositionChange: (position: string) => void;
  currentMenuPosition: string;
  onHeaderPositionChange: (position: string) => void;
  currentHeaderPosition: string;
  onLoaderChange: (enabled: boolean) => void;
  currentLoaderEnabled: boolean;
  onThemeBackgroundChange: (color: string) => void;
  currentThemeBackground: string;
  onMenuBackgroundChange: (bg: string) => void;
  currentMenuBackground: string;
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
  currentLayout,
  onThemeChange,
  currentTheme,
  onMenuStyleChange,
  currentMenuStyle,
  onSidemenuLayoutChange,
  currentSidemenuLayout,
  onPageStyleChange,
  currentPageStyle,
  onLayoutWidthChange,
  currentLayoutWidth,
  onMenuPositionChange,
  currentMenuPosition,
  onHeaderPositionChange,
  currentHeaderPosition,
  onLoaderChange,
  currentLoaderEnabled,
  onThemeBackgroundChange,
  currentThemeBackground,
  onMenuBackgroundChange,
  currentMenuBackground
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const { setPrimaryColor } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const resetSettings = () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('sidebarCollapsed');
    localStorage.removeItem('navigationStyle');
    localStorage.removeItem('headerStyle');
    localStorage.removeItem('direction');
    localStorage.removeItem('layout');
    localStorage.removeItem('menuStyle');
    localStorage.removeItem('sidemenuLayout');
    localStorage.removeItem('pageStyle');
    localStorage.removeItem('layoutWidth');
    localStorage.removeItem('menuPosition');
    localStorage.removeItem('headerPosition');
    localStorage.removeItem('loaderEnabled');
    localStorage.removeItem('themeBackground');
    localStorage.removeItem('menuBackground');
    setPrimaryColor('blue');
    window.location.reload();
  };

  if (!isVisible) return null;

  // Color palette options
  const colorOptions = [
    { id: 'primary-1', name: 'Primary 1', color: 'bg-blue-500' },
    { id: 'primary-2', name: 'Primary 2', color: 'bg-purple-500' },
    { id: 'primary-3', name: 'Primary 3', color: 'bg-green-500' },
    { id: 'primary-4', name: 'Primary 4', color: 'bg-yellow-500' },
    { id: 'primary-5', name: 'Primary 5', color: 'bg-red-500' },
  ];

  const bgColorOptions = [
    { id: 'bg-1', name: 'BG 1', color: 'bg-gray-100' },
    { id: 'bg-2', name: 'BG 2', color: 'bg-gray-200' },
    { id: 'bg-3', name: 'BG 3', color: 'bg-gray-300' },
    { id: 'bg-4', name: 'BG 4', color: 'bg-gray-400' },
    { id: 'bg-5', name: 'BG 5', color: 'bg-gray-500' },
  ];

  const bgImageOptions = [
    { id: 'bg-img1', name: 'BG Image 1', image: 'bg-img1' },
    { id: 'bg-img2', name: 'BG Image 2', image: 'bg-img2' },
    { id: 'bg-img3', name: 'BG Image 3', image: 'bg-img3' },
    { id: 'bg-img4', name: 'BG Image 4', image: 'bg-img4' },
    { id: 'bg-img5', name: 'BG Image 5', image: 'bg-img5' },
  ];

  const menuStyles = [
    { id: 'click', name: 'Menu Click' },
    { id: 'hover', name: 'Menu Hover' },
    { id: 'icon-click', name: 'Icon Click' },
    { id: 'icon-hover', name: 'Icon Hover' },
  ];

  const sidemenuLayouts = [
    { id: 'default', name: 'Default Menu' },
    { id: 'closed', name: 'Closed Menu' },
    { id: 'icontext', name: 'Icon Text' },
    { id: 'overlay', name: 'Icon Overlay' },
    { id: 'detached', name: 'Detached' },
    { id: 'double', name: 'Double Menu' },
  ];

  const pageStyles = [
    { id: 'regular', name: 'Regular' },
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
  ];

  const layoutWidths = [
    { id: 'full', name: 'Full Width' },
    { id: 'boxed', name: 'Boxed' },
  ];

  const positions = [
    { id: 'fixed', name: 'Fixed' },
    { id: 'scrollable', name: 'Scrollable' },
  ];

  const handlePrimaryColorChange = (colorId: string) => {
    const colorMap: Record<string, string> = {
      'primary-1': 'blue',
      'primary-2': 'purple',
      'primary-3': 'green',
      'primary-4': 'yellow',
      'primary-5': 'red'
    };
    
    const color = colorMap[colorId] || 'blue';
    setPrimaryColor(color);
    
    onThemeBackgroundChange(colorId);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Switcher Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}
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
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentTheme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onThemeChange('light')}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-white rounded-md shadow-inner mb-2"></div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentTheme === 'light' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Light</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${currentTheme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onThemeChange('dark')}
                      >
                        <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md shadow-inner mb-2"></div>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full border mr-2 ${currentTheme === 'dark' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
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

                  {/* Menu Styles */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Menu Styles</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {menuStyles.map((style) => (
                        <div 
                          key={style.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentMenuStyle === style.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onMenuStyleChange(style.id)}
                        >
                          <div className="flex items-center justify-center h-12 mb-1">
                            <div className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentMenuStyle === style.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{style.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidemenu Layout Styles */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Sidemenu Layout</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {sidemenuLayouts.map((layout) => (
                        <div 
                          key={layout.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentSidemenuLayout === layout.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onSidemenuLayoutChange(layout.id)}
                        >
                          <div className="flex items-center justify-center h-12 mb-1">
                            <div className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentSidemenuLayout === layout.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{layout.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Page Styles */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Page Styles</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {pageStyles.map((style) => (
                        <div 
                          key={style.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentPageStyle === style.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onPageStyleChange(style.id)}
                        >
                          <div className="flex items-center justify-center h-10 mb-1">
                            <div className="w-6 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentPageStyle === style.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{style.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout Width */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Layout Width</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {layoutWidths.map((width) => (
                        <div 
                          key={width.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentLayoutWidth === width.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onLayoutWidthChange(width.id)}
                        >
                          <div className="flex items-center justify-center h-10 mb-1">
                            <div className={`w-8 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center ${width.id === 'full' ? 'w-10' : 'w-6'}`}>
                              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentLayoutWidth === width.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{width.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Menu Positions */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Menu Positions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {positions.map((position) => (
                        <div 
                          key={position.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentMenuPosition === position.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onMenuPositionChange(position.id)}
                        >
                          <div className="flex items-center justify-center h-10 mb-1">
                            <div className="w-8 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentMenuPosition === position.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{position.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Header Positions */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Header Positions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {positions.map((position) => (
                        <div 
                          key={position.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${currentHeaderPosition === position.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                          onClick={() => onHeaderPositionChange(position.id)}
                        >
                          <div className="flex items-center justify-center h-10 mb-1">
                            <div className="w-8 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`h-3 w-3 rounded-full border mr-1 ${currentHeaderPosition === position.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">{position.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loader */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Loader</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${currentLoaderEnabled ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onLoaderChange(true)}
                      >
                        <div className="flex items-center justify-center h-10 mb-1">
                          <div className="w-8 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className={`h-3 w-3 rounded-full border mr-1 ${currentLoaderEnabled ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-xs text-gray-700 dark:text-gray-300">Enable</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${!currentLoaderEnabled ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                        onClick={() => onLoaderChange(false)}
                      >
                        <div className="flex items-center justify-center h-10 mb-1">
                          <div className="w-8 h-6 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className={`h-3 w-3 rounded-full border mr-1 ${!currentLoaderEnabled ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                          <span className="text-xs text-gray-700 dark:text-gray-300">Disable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div className="space-y-6">
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
                      <div 
                        className={`w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentHeaderStyle === 'gradient' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`} 
                        onClick={() => onHeaderStyleChange('gradient')}
                        title="Gradient Header"
                      ></div>
                      <div 
                        className={`w-8 h-8 bg-transparent border border-gray-300 dark:border-gray-600 rounded cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                          currentHeaderStyle === 'transparent' ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-500' : ''
                        }`} 
                        onClick={() => onHeaderStyleChange('transparent')}
                        title="Transparent Header"
                      ></div>
                    </div>
                  </div>

                  {/* Theme Primary Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Theme Primary</h3>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color) => (
                        <div 
                          key={color.id}
                          className={`w-8 h-8 ${color.color} rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow ${
                            currentThemeBackground === color.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                          }`}
                          onClick={() => handlePrimaryColorChange(color.id)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Background Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Theme Background</h3>
                    <div className="flex flex-wrap gap-3">
                      {bgColorOptions.map((color) => (
                        <div 
                          key={color.id}
                          className={`w-8 h-8 ${color.color} rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow ${
                            currentThemeBackground === color.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                          }`}
                          onClick={() => onThemeBackgroundChange(color.id)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Menu Background Images */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Menu Background Images</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {bgImageOptions.map((bg) => (
                        <div 
                          key={bg.id}
                          className={`w-full h-16 rounded cursor-pointer bg-gray-200 border border-gray-300 dark:border-gray-600 flex items-center justify-center ${
                            currentMenuBackground === bg.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => onMenuBackgroundChange(bg.id)}
                          title={bg.name}
                        >
                          <span className="text-xs text-gray-600">{bg.name}</span>
                        </div>
                      ))}
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