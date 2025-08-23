"use client";

import { useState, useEffect } from 'react';
import Switcher from './Switcher';
import Image from 'next/image';
import Link from 'next/link'; 
import { ThemeProvider } from '../common/ThemeContext';
import { 
  Bell, ShoppingCart, Search, Sun, Moon, 
  Maximize, Minimize, Grid, User, Settings, LogOut, Menu,
  X, MessageSquare, Mail
} from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onNavigationStyleChange: (style: string) => void;
  currentNavigationStyle: string;
  headerStyle: string;
  onHeaderStyleChange: (style: string) => void;
  onDirectionChange: (direction: 'ltr' | 'rtl') => void;
  onLayoutChange: (layout: 'vertical' | 'horizontal') => void;
  currentDirection: 'ltr' | 'rtl';
  currentLayout: 'vertical' | 'horizontal';
}

export default function Header({ 
  setSidebarOpen, 
  toggleSidebar, 
  isSidebarCollapsed,
  onNavigationStyleChange,
  currentNavigationStyle,
  headerStyle,
  onHeaderStyleChange,
  onDirectionChange,
  onLayoutChange,
  currentDirection,
  currentLayout
}: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('.user-menu')) setUserMenuOpen(false);
      if (!target.closest('.notifications-menu')) setNotificationsOpen(false);
      if (!target.closest('.cart-menu')) setCartOpen(false);
      if (!target.closest('.language-menu')) setLanguageOpen(false);
      if (!target.closest('.apps-menu')) setAppsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getHeaderClasses = () => {
    const baseClasses = "shadow-sm z-10 sticky top-0 transition-colors duration-300";
    
    if (headerStyle === 'dark') {
      return `${baseClasses} bg-gray-800 text-white`;
    } else if (headerStyle === 'primary') {
      return `${baseClasses} bg-blue-600 text-white`;
    } else {
      return `${baseClasses} bg-white dark:bg-gray-800 text-gray-800 dark:text-white`;
    }
  };

  return (
    <ThemeProvider>
        <header className={getHeaderClasses()}>
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left section */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="horizontal-logo mr-4">
                <Link href="/" className="header-logo">
                  <Image 
                    src="/assets/images/brand-logos/desktop-logo.png" 
                    alt="logo" 
                    className="desktop-logo h-8 hidden dark:block"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src="/assets/images/brand-logos/desktop-dark.png" 
                    alt="logo" 
                    className="desktop-dark h-8 dark:hidden"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
              
              {/* Sidebar toggle for mobile */}
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white lg:hidden mr-3"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="w-6 h-6" />
              </button>

              {/* Tombol toggle sidebar - desktop */}
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1 hidden md:block ml-2"
                onClick={toggleSidebar}
                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isSidebarCollapsed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                )}
              </button>

              {/* Search bar - desktop */}
              <div className="hidden md:block ml-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-64 pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-3">
              {/* Search icon for mobile */}
              <button 
                className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Mobile search overlay */}
              {searchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                  <div className="bg-white dark:bg-gray-800 p-4">
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="Search..." 
                          className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
                      </div>
                      <button 
                        className="ml-2 text-gray-500 dark:text-gray-300"
                        onClick={() => setSearchOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Language selector */}
              <div className="relative language-menu">
                <button 
                  className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                  onClick={() => setLanguageOpen(!languageOpen)}
                >
                  <Image 
                    src="/assets/images/flags/us_flag.jpg" 
                    alt="English" 
                    className="w-6 h-6 rounded-full"
                    width={24}
                    height={24}
                  />
                </button>
                
                {/* Language dropdown */}
                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Select Language</h3>
                    </div>
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Image 
                          src="/assets/images/flags/us_flag.jpg" 
                          alt="English" 
                          className="w-5 h-5 rounded-full mr-2"
                          width={20}
                          height={20}
                        />
                        English
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Image 
                          src="/assets/images/flags/spain_flag.jpg" 
                          alt="Spanish" 
                          className="w-5 h-5 rounded-full mr-2"
                          width={20}
                          height={20}
                        />
                        Spanish
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Image 
                          src="/assets/images/flags/french_flag.jpg" 
                          alt="French" 
                          className="w-5 h-5 rounded-full mr-2"
                          width={20}
                          height={20}
                        />
                        French
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              <button
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Shopping cart */}
              <div className="relative cart-menu">
                <button 
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1 relative"
                  onClick={() => setCartOpen(!cartOpen)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    5
                  </span>
                </button>
                
                {/* Cart dropdown */}
                {cartOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-3 border-b dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Shopping Cart</h3>
                        <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded">
                          5 Items
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto p-2">
                      {/* Cart items */}
                      <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                        <Image 
                          src="/assets/images/ecommerce/19.jpg" 
                          alt="Lence Camera" 
                          className="w-12 h-12 rounded object-cover"
                          width={48}
                          height={48}
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">Lence Camera</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">1 × $189.00</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                        <Image 
                          src="/assets/images/ecommerce/16.jpg" 
                          alt="White Earbuds" 
                          className="w-12 h-12 rounded object-cover"
                          width={48}
                          height={48}
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">White Earbuds</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">3 × $59.00</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border-t dark:border-gray-700">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-800 dark:text-white">Sub Total:</span>
                        <span className="font-medium text-gray-800 dark:text-white">$485.93</span>
                      </div>
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm">
                        Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative notifications-menu">
                <button 
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1 relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    6
                  </span>
                </button>
                
                {/* Notifications dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-3 border-b dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                          6 Unread
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {/* Notification items */}
                      <div className="p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex">
                          <div className="mr-3">
                            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                              <span className="text-white text-sm">📁</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              <Link href="#" className="hover:underline">New Files available</Link>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">10 hours ago</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex">
                          <div className="mr-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                              <span className="text-white text-sm">🔄</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              <Link href="#" className="hover:underline">Updates available</Link>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t dark:border-gray-700">
                      <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Apps */}
              <div className="relative apps-menu hidden md:block">
                <button 
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                  onClick={() => setAppsOpen(!appsOpen)}
                >
                  <Grid className="h-5 w-5" />
                </button>
                
                {/* Apps dropdown */}
                {appsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-3 border-b dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Related Apps</h3>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-3 gap-2">
                        {/* App items */}
                        <Link href="#" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Image 
                            src="/assets/images/apps/figma.png" 
                            alt="Figma" 
                            className="w-10 h-10 rounded"
                            width={40}
                            height={40}
                          />
                          <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">Figma</span>
                        </Link>
                        <Link href="#" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Image 
                            src="/assets/images/apps/microsoft-powerpoint.png" 
                            alt="PowerPoint" 
                            className="w-10 h-10 rounded"
                            width={40}
                            height={40}
                          />
                          <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">PowerPoint</span>
                        </Link>
                        <Link href="#" className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Image 
                            src="/assets/images/apps/microsoft-word.png" 
                            alt="Word" 
                            className="w-10 h-10 rounded"
                            width={40}
                            height={40}
                          />
                          <span className="text-xs mt-2 text-gray-700 dark:text-gray-300">MS Word</span>
                        </Link>
                      </div>
                    </div>
                    <div className="p-3 border-t dark:border-gray-700">
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm">
                        View All Apps
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>

              {/* Theme switcher */}
              <button 
                className="text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white p-1"
                onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"/>
                  <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.530 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733z"/>
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

          {/* Komponen Switcher */}
          <Switcher 
            isOpen={isSwitcherOpen} 
            onClose={() => setIsSwitcherOpen(false)} 
            onNavigationStyleChange={onNavigationStyleChange}
            currentNavigationStyle={currentNavigationStyle}
            onHeaderStyleChange={onHeaderStyleChange}
            currentHeaderStyle={headerStyle}
            onDirectionChange={onDirectionChange}
            currentDirection={currentDirection}
            onLayoutChange={onLayoutChange}
            currentLayout={currentLayout}
          />
        </header>
    </ThemeProvider>
  );
}