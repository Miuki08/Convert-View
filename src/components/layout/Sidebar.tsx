"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, Users, Image as ImageIcon, AlertCircle, Bell, 
  FolderTree, Folder, FileText, Layers, Settings, 
  CreditCard, Mail, MessageSquare, PieChart, 
  BarChart3, Map
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  navigationStyle: string;
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

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, navigationStyle }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue by waiting for component to mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg lg:static lg:inset-0 ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}`} />
    );
  }

  const getSidebarClasses = () => {
    const baseClasses = `
      fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 lg:static lg:inset-0
      ${isCollapsed ? 'w-16' : 'w-64'}
    `;
    
    const styleClasses = 
      navigationStyle === 'dark' ? 'bg-gray-800' : 
      navigationStyle === 'primary' ? 'bg-blue-600' : 
      navigationStyle === 'gradient' ? 'bg-gradient-to-b from-blue-400 to-purple-500' : 
      navigationStyle === 'transparent' ? 'bg-transparent' : 'bg-white';
    
    return `${baseClasses} ${styleClasses}`;
  };

  const getHeaderClasses = () => {
    const baseClasses = 'flex items-center justify-between h-16 px-4 border-b';
    
    const styleClasses = 
      navigationStyle === 'dark' ? 'border-gray-700 bg-gray-800' : 
      navigationStyle === 'primary' ? 'border-blue-700 bg-blue-600' : 
      navigationStyle === 'gradient' ? 'border-blue-300/30 bg-transparent' : 
      navigationStyle === 'transparent' ? 'border-gray-200/30 bg-transparent' : 
      'border-gray-200 bg-white';
    
    return `${baseClasses} ${styleClasses}`;
  };

  const getTextColor = () => {
    return navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
      ? 'text-gray-200' : 'text-gray-700';
  };

  const getHoverBg = () => {
    return navigationStyle === 'dark' ? 'hover:bg-gray-700' : 
      navigationStyle === 'primary' ? 'hover:bg-blue-700' : 
      navigationStyle === 'gradient' ? 'hover:bg-white/10' : 
      navigationStyle === 'transparent' ? 'hover:bg-gray-100/30' : 
      'hover:bg-gray-100';
  };

  const getActiveClasses = () => {
    const baseClasses = navigationStyle === 'dark' ? 'bg-gray-700' : 
      navigationStyle === 'primary' ? 'bg-blue-700' : 
      navigationStyle === 'gradient' ? 'bg-white/10' : 
      navigationStyle === 'transparent' ? 'bg-gray-100/30' : 
      'bg-blue-50';
    
    const textClasses = navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
      ? 'text-white' : 'text-blue-600';
    
    return `${baseClasses} ${textClasses}`;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={getSidebarClasses()}>
        <div className={getHeaderClasses()}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center">
              <Image 
                src="/brand-logos/desktop-logo.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="h-8 w-auto"
              />
              <span className={`ml-2 text-xl font-bold ${
                navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
                ? 'text-white' : 'text-blue-600'
              }`}>αzυre</span>
            </Link>
          )}
          {!isCollapsed && (
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="h-full overflow-y-auto pb-16">
          <nav className={isCollapsed ? "px-2 py-6" : "px-4 py-6"}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path || isChildActive(item.children);
              const IconComponent = item.icon;
              
              return (
                <div key={index} className="mb-2">
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                          openMenus.includes(item.title) || isActive
                            ? getActiveClasses()
                            : `${getTextColor()} ${getHoverBg()}`
                        }`}
                        onClick={() => toggleMenu(item.title)}
                      >
                        <IconComponent className={isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            <svg 
                              className={`w-4 h-4 transition-transform ${
                                openMenus.includes(item.title) ? 'rotate-90' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      
                      {openMenus.includes(item.title) && !isCollapsed && (
                        <div className="pl-9 mt-1 space-y-1">
                          {item.children.map((child, childIndex) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={childIndex}
                                href={child.path || '#'}
                                className={`flex items-center p-2 text-sm rounded-lg transition-colors ${
                                  pathname === child.path
                                    ? getActiveClasses()
                                    : `${getTextColor()} ${getHoverBg()}`
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {ChildIcon && <ChildIcon className="w-4 h-4 mr-2" />}
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
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        isActive
                          ? getActiveClasses()
                          : `${getTextColor()} ${getHoverBg()}`
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className={isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* User profile section at bottom */}
          {!isCollapsed && (
            <div className={`fixed bottom-0 left-0 w-64 p-4 border-t ${
              navigationStyle === 'dark' ? 'bg-gray-800 border-gray-700' : 
              navigationStyle === 'primary' ? 'bg-blue-600 border-blue-700' : 
              navigationStyle === 'gradient' ? 'bg-transparent border-white/20' : 
              navigationStyle === 'transparent' ? 'bg-transparent border-gray-200/30' : 
              'bg-white border-gray-200'
            }`}>
              <div className="flex items-center">
                <Image 
                  src="/images/faces/2.jpg" 
                  alt="User" 
                  width={40} 
                  height={40} 
                  className="rounded-full" 
                />
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
                    ? 'text-white' : 'text-gray-800'
                  }`}>Ashton Cox</p>
                  <p className={`text-xs ${
                    navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
                    ? 'text-gray-300' : 'text-gray-500'
                  }`}>Web Developer</p>
                </div>
                <button className={`ml-auto ${
                  navigationStyle === 'dark' || navigationStyle === 'primary' || navigationStyle === 'gradient' 
                  ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                }`}>
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}