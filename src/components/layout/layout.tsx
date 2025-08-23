"use client";

import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [navigationStyle, setNavigationStyle] = useState('light');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    const savedNavStyle = localStorage.getItem('navigationStyle');
    
    if (savedCollapsed) {
      setIsSidebarCollapsed(savedCollapsed === 'true');
    }
    
    if (savedNavStyle) {
      setNavigationStyle(savedNavStyle);
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('navigationStyle', navigationStyle);
  }, [navigationStyle]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isCollapsed={isSidebarCollapsed}
        navigationStyle={navigationStyle}
      />
      
      {/* Main content - HAPUS margin/margin-left yang menyebabkan gap */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          setSidebarOpen={setSidebarOpen} 
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          onNavigationStyleChange={setNavigationStyle}
          currentNavigationStyle={navigationStyle}
        />
        
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