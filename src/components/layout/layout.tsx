"use client";

import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalHeader from './HorizontalHeader';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [navigationStyle, setNavigationStyle] = useState('light');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [headerStyle, setHeaderStyle] = useState('light');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    const savedNavStyle = localStorage.getItem('navigationStyle');
    const savedDirection = localStorage.getItem('direction');
    const savedLayout = localStorage.getItem('layout');
    const savedHeaderStyle = localStorage.getItem('headerStyle');
    
    if (savedCollapsed) {
      setIsSidebarCollapsed(savedCollapsed === 'true');
    }
    
    if (savedNavStyle) {
      setNavigationStyle(savedNavStyle);
    }
    
    if (savedDirection) {
      setDirection(savedDirection as 'ltr' | 'rtl');
      document.documentElement.dir = savedDirection;
    }

    if (savedLayout) {
      setLayout(savedLayout as 'vertical' | 'horizontal');
    }

    if (savedHeaderStyle) {
      setHeaderStyle(savedHeaderStyle);
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('navigationStyle', navigationStyle);
  }, [navigationStyle]);

  useEffect(() => {
    localStorage.setItem('direction', direction);
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    localStorage.setItem('layout', layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('headerStyle', headerStyle);
  }, [headerStyle]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleDirectionChange = (newDirection: 'ltr' | 'rtl') => {
    setDirection(newDirection);
  };

  const handleLayoutChange = (newLayout: 'vertical' | 'horizontal') => {
    setLayout(newLayout);
  };

  const handleHeaderStyleChange = (style: string) => {
    setHeaderStyle(style);
  };

  return (
    <div className={`flex h-screen bg-white dark:bg-gray-900 transition-colors duration-300`} dir={direction}>
      {/* Sidebar - hanya untuk layout vertikal */}
      {layout === 'vertical' && (
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          isCollapsed={isSidebarCollapsed}
          navigationStyle={navigationStyle}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - berbeda berdasarkan layout */}
        {layout === 'horizontal' ? (
          <HorizontalHeader 
            navigationStyle={navigationStyle}
            headerStyle={headerStyle}
          />
        ) : (
          <Header 
            setSidebarOpen={setSidebarOpen} 
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            onNavigationStyleChange={setNavigationStyle}
            currentNavigationStyle={navigationStyle}
            headerStyle={headerStyle}
            onHeaderStyleChange={handleHeaderStyleChange}
            onDirectionChange={handleDirectionChange}
            onLayoutChange={handleLayoutChange}
            currentDirection={direction}
            currentLayout={layout}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-0 scrollbar-hide">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>    
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <MainLayout>{children}</MainLayout>
  );
}