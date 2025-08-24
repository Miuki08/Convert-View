"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, Users, Image as ImageIcon, AlertCircle, Bell, 
  FolderTree, Folder, FileText, Layers, Settings, 
  CreditCard, Mail, MessageSquare, PieChart, 
  BarChart3, Map, Sun, Moon, User, LogOut,
  ChevronDown, ChevronRight, Menu, X
} from 'lucide-react';
import Switcher from './Switcher';

interface HorizontalHeaderProps {
  navigationStyle: string;
  headerStyle: string;
  onNavigationStyleChange: (style: string) => void;
  onHeaderStyleChange: (style: string) => void;
  onDirectionChange: (direction: 'ltr' | 'rtl') => void;
  onLayoutChange: (layout: 'vertical' | 'horizontal') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  currentDirection: 'ltr' | 'rtl';
  currentLayout: 'vertical' | 'horizontal';
  currentTheme: 'light' | 'dark';
  onMenuStyleChange: (style: string) => void;
  menuStyle: string;
  onSidemenuLayoutChange: (layout: string) => void;
  sidemenuLayout: string;
  onPageStyleChange: (style: string) => void;
  pageStyle: string;
  onLayoutWidthChange: (width: string) => void;
  layoutWidth: string;
  onMenuPositionChange: (position: string) => void;
  menuPosition: string;
  onHeaderPositionChange: (position: string) => void;
  headerPosition: string;
  onLoaderChange: (enabled: boolean) => void;
  loaderEnabled: boolean;
  onThemeBackgroundChange: (background: string) => void;
  themeBackground: string;
  onMenuBackgroundChange: (background: string) => void;
  menuBackground: string;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboards',
    icon: Home,
    children: [
      { title: 'Dashboard-1', path: '/', icon: Home },
      { title: 'Dashboard-2', path: '/dashboard2', icon: Home },
      { title: 'Dashboard-3', path: '/dashboard3', icon: Home },
    ]
  },
  {
    title: 'Apps',
    icon: Calendar,
    children: [
      { title: 'Full Calendar', path: '/full-calendar', icon: Calendar },
      { title: 'Contacts', path: '/contacts', icon: Users },
      { title: 'Gallery', path: '/gallery', icon: ImageIcon },
      { title: 'Alerts', path: '/alerts', icon: AlertCircle },
      { title: 'Notifications', path: '/notifications', icon: Bell },
      { title: 'File Manager', path: '/file-manager', icon: FolderTree },
      { title: 'Documents', path: '/documents', icon: FileText },
      { title: 'Projects', path: '/projects', icon: Folder },
      { title: 'Tasks', path: '/tasks', icon: Layers },
    ]
  },
  {
    title: 'Charts',
    icon: PieChart,
    children: [
      { title: 'Pie Charts', path: '/pie-charts', icon: PieChart },
      { title: 'Bar Charts', path: '/bar-charts', icon: BarChart3 },
    ]
  },
  {
    title: 'Maps',
    icon: Map,
    path: '/maps'
  },
  {
    title: 'Inbox',
    icon: Mail,
    path: '/inbox'
  },
  {
    title: 'Chat',
    icon: MessageSquare,
    path: '/chat'
  },
  {
    title: 'Billing',
    icon: CreditCard,
    path: '/billing'
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings'
  }
];

const HorizontalHeader: React.FC<HorizontalHeaderProps> = ({ 
  navigationStyle, 
  headerStyle,
  onNavigationStyleChange,
  onHeaderStyleChange,
  onDirectionChange,
  onLayoutChange,
  onThemeChange,
  currentDirection,
  currentLayout,
  currentTheme,
  onMenuStyleChange,
  menuStyle,
  onSidemenuLayoutChange,
  sidemenuLayout,
  onPageStyleChange,
  pageStyle,
  onLayoutWidthChange,
  layoutWidth,
  onMenuPositionChange,
  menuPosition,
  onHeaderPositionChange,
  headerPosition,
  onLoaderChange,
  loaderEnabled,
  onThemeBackgroundChange,
  themeBackground,
  onMenuBackgroundChange,
  menuBackground
}) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = (title: string) => {
    if (openMenus.includes(title)) {
      setOpenMenus(openMenus.filter(item => item !== title));
    } else {
      setOpenMenus([...openMenus, title]);
    }
  };

  // Auto-open menu when a child is active
  const isChildActive = (children: MenuItem[] = []) => {
    return children.some(child => pathname === child.path);
  };

  const getHeaderClasses = () => {
    const baseClasses = "shadow-md";
    
    if (headerStyle === 'dark') {
      return `${baseClasses} bg-gray-800`;
    } else if (headerStyle === 'primary') {
      return `${baseClasses} bg-blue-600`;
    } else {
      return `${baseClasses} bg-white dark:bg-gray-800`;
    }
  };

  const getTextColor = () => {
    return headerStyle === 'dark' || headerStyle === 'primary' 
      ? 'text-white' 
      : 'text-gray-800 dark:text-white';
  };

  const getHoverBg = () => {
    return headerStyle === 'dark' ? 'hover:bg-gray-700' : 
      headerStyle === 'primary' ? 'hover:bg-blue-700' : 
      'hover:bg-gray-100 dark:hover:bg-gray-700';
  };

  const getActiveClasses = () => {
    const baseClasses = headerStyle === 'dark' ? 'bg-gray-700' : 
      headerStyle === 'primary' ? 'bg-blue-700' : 
      'bg-blue-50 dark:bg-blue-900';
    
    const textClasses = headerStyle === 'dark' || headerStyle === 'primary' 
      ? 'text-white' : 'text-blue-600 dark:text-blue-300';
    
    return `${baseClasses} ${textClasses}`;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('.user-menu')) setUserMenuOpen(false);
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={getHeaderClasses()}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white mr-3 mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image 
                  src="/assets/images/brand-logos/desktop-logo.png" 
                  alt="Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-auto"
                />
                <span className={`ml-2 text-xl font-bold ${getTextColor()}`}>YourApp</span>
              </Link>
            </div>

            {/* Desktop Menu Items */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path || isChildActive(item.children);
                const IconComponent = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                
                return (
                  <div key={index} className="relative group">
                    {hasChildren ? (
                      <button
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? getActiveClasses()
                            : `${getTextColor()} ${getHoverBg()}`
                        }`}
                        onClick={() => toggleMenu(item.title)}
                      >
                        <IconComponent className="w-4 h-4 mr-1" />
                        {item.title}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                    ) : (
                      <Link
                        href={item.path || '#'}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? getActiveClasses()
                            : `${getTextColor()} ${getHoverBg()}`
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-1" />
                        {item.title}
                      </Link>
                    )}
                    
                    {/* Dropdown for items with children */}
                    {hasChildren && openMenus.includes(item.title) && (
                      <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                        {item.children!.map((child, childIndex) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={childIndex}
                              href={child.path || '#'}
                              className={`flex items-center px-4 py-2 text-sm transition-colors ${
                                pathname === child.path
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              {ChildIcon && <ChildIcon className="w-4 h-4 mr-2" />}
                              <span>{child.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Section - User Menu and Controls */}
            <div className="flex items-center space-x-3">
              {/* Dark mode toggle */}
              <button
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                onClick={() => onThemeChange(currentTheme === 'light' ? 'dark' : 'light')}
                aria-label={currentTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                {currentTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Theme switcher */}
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"/>
                  <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.530 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733z"/>
                </svg>
              </button>

              {/* User menu */}
              <div className="relative user-menu">
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <Image 
                    src="/assets/images/faces/2.jpg" 
                    alt="User" 
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">Ashton Cox</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Web Developer</p>
                  </div>
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Inbox <span className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded">25</span>
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Link>
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <div className="border-t my-1 dark:border-gray-700"></div>
                    <Link href="#" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <nav className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path || isChildActive(item.children);
                const IconComponent = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                
                return (
                  <div key={index}>
                    {hasChildren ? (
                      <>
                        <button
                          className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            isActive
                              ? getActiveClasses()
                              : `${getTextColor()} ${getHoverBg()}`
                          }`}
                          onClick={() => toggleMenu(item.title)}
                        >
                          <IconComponent className="w-5 h-5 mr-3" />
                          {item.title}
                          {openMenus.includes(item.title) ? (
                            <ChevronDown className="w-4 h-4 ml-auto" />
                          ) : (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                        
                        {openMenus.includes(item.title) && (
                          <div className="pl-11 mt-1 space-y-1">
                            {item.children!.map((child, childIndex) => {
                              const ChildIcon = child.icon;
                              return (
                                <Link
                                  key={childIndex}
                                  href={child.path || '#'}
                                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    pathname === child.path
                                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {ChildIcon && <ChildIcon className="w-4 h-4 mr-3" />}
                                  <span>{child.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path || '#'}
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive
                            ? getActiveClasses()
                            : `${getTextColor()} ${getHoverBg()}`
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 mr-3" />
                        {item.title}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Komponen Switcher */}
      <Switcher 
        isOpen={isSwitcherOpen} 
        onClose={() => setIsSwitcherOpen(false)} 
        onNavigationStyleChange={onNavigationStyleChange}
        currentNavigationStyle={navigationStyle}
        onHeaderStyleChange={onHeaderStyleChange}
        currentHeaderStyle={headerStyle}
        onDirectionChange={onDirectionChange}
        currentDirection={currentDirection}
        onLayoutChange={onLayoutChange}
        currentLayout={currentLayout}
        onThemeChange={onThemeChange}
        currentTheme={currentTheme}
        onMenuStyleChange={onMenuStyleChange}
        currentMenuStyle={menuStyle}
        onSidemenuLayoutChange={onSidemenuLayoutChange}
        currentSidemenuLayout={sidemenuLayout}
        onPageStyleChange={onPageStyleChange}
        currentPageStyle={pageStyle}
        onLayoutWidthChange={onLayoutWidthChange}
        currentLayoutWidth={layoutWidth}
        onMenuPositionChange={onMenuPositionChange}
        currentMenuPosition={menuPosition}
        onHeaderPositionChange={onHeaderPositionChange}
        currentHeaderPosition={headerPosition}
        onLoaderChange={onLoaderChange}
        currentLoaderEnabled={loaderEnabled}
        onThemeBackgroundChange={onThemeBackgroundChange}
        currentThemeBackground={themeBackground}
        onMenuBackgroundChange={onMenuBackgroundChange}
        currentMenuBackground={menuBackground}
      />
    </>
  );
};

export default HorizontalHeader;