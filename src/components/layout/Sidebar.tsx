"use client";

import { useState } from 'react';
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

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

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
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b">
          <Link href="/" className="flex items-center">
            <Image 
              src="/brand-logos/desktop-logo.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-blue-600">YourApp</span>
          </Link>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="h-full overflow-y-auto pb-16">
          <nav className="px-4 py-6">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path || isChildActive(item.children);
              
              return (
                <div key={index} className="mb-2">
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                          openMenus.includes(item.title) || isActive
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => toggleMenu(item.title)}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
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
                      </button>
                      
                      {openMenus.includes(item.title) && (
                        <div className="pl-9 mt-1 space-y-1">
                          {item.children.map((child, childIndex) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={childIndex}
                                href={child.path || '#'}
                                className={`flex items-center p-2 text-sm rounded-lg transition-colors ${
                                  pathname === child.path
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
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
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* User profile section at bottom */}
          <div className="fixed bottom-0 left-0 w-64 p-4 border-t bg-white">
            <div className="flex items-center">
              <Image 
                src="/images/faces/2.jpg" 
                alt="User" 
                width={40} 
                height={40} 
                className="rounded-full" 
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Ashton Cox</p>
                <p className="text-xs text-gray-500">Web Developer</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}