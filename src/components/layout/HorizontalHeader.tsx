"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, Users, Image as ImageIcon, AlertCircle, Bell, 
  FolderTree, Folder, FileText, Layers, Settings, 
  CreditCard, Mail, MessageSquare, PieChart, 
  BarChart3, Map
} from 'lucide-react';

interface HorizontalHeaderProps {
  navigationStyle: string;
  headerStyle: string;
}

const HorizontalHeader: React.FC<HorizontalHeaderProps> = ({ navigationStyle, headerStyle }) => {
  const pathname = usePathname();
  
  const menuItems = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Calendar', path: '/calendar', icon: Calendar },
    { title: 'Contacts', path: '/contacts', icon: Users },
    { title: 'Gallery', path: '/gallery', icon: ImageIcon },
    { title: 'Alerts', path: '/alerts', icon: AlertCircle },
    { title: 'Notifications', path: '/notifications', icon: Bell },
  ];

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

  return (
    <div className={getHeaderClasses()}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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

          {/* Menu Items */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-black bg-opacity-10 text-white' 
                      : `${getTextColor()} hover:bg-black hover:bg-opacity-5`
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-1" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* User Menu dan Controls - bisa ditambahkan dari Header.tsx */}
          <div className="flex items-center">
            <div className="text-gray-500 dark:text-gray-300">
              User Menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalHeader;