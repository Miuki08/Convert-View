"use client";

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Switcher from "./Switcher";
import Loader from '../common/Loader';
import { ThemeProvider } from '../common/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      {/* Switcher */}
      <Switcher />
      
      {/* Loader */}
      <Loader />
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}