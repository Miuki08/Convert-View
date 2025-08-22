import { useState } from 'react';
import Image from 'next/image';
import { 
  Bell, ShoppingCart, Search, Globe, Sun, Moon, 
  Maximize, Grid, User, Settings, LogOut 
} from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center">
          <button 
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            {/* Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden md:block ml-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search icon for mobile */}
          <button className="md:hidden text-gray-500 hover:text-gray-600">
            <Search className="h-5 w-5" />
          </button>

          {/* Language selector */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-500 hover:text-gray-600"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <Globe className="h-5 w-5 mr-1" />
              <span className="hidden sm:block">EN</span>
            </button>
            
            {/* Language dropdown */}
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-50">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  English
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Spanish
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  French
                </button>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button 
            className="text-gray-500 hover:text-gray-600"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Shopping cart */}
          <div className="relative">
            <button 
              className="text-gray-500 hover:text-gray-600 relative"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </button>
            
            {/* Cart dropdown */}
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <h3 className="font-semibold">Shopping Cart</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 flex items-center hover:bg-gray-50">
                    <Image 
                      src="/images/products/1.jpg" 
                      alt="Product" 
                      width={40} 
                      height={40} 
                      className="rounded" 
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium">Wireless Headphones</p>
                      <p className="text-xs text-gray-500">1 x $99.99</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center hover:bg-gray-50">
                    <Image 
                      src="/images/products/2.jpg" 
                      alt="Product" 
                      width={40} 
                      height={40} 
                      className="rounded" 
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium">Smart Watch</p>
                      <p className="text-xs text-gray-500">1 x $199.99</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">$299.98</span>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="text-gray-500 hover:text-gray-600 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                6
              </span>
            </button>
            
            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-gray-500">You have a new message from John</p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium">Order shipped</p>
                    <p className="text-xs text-gray-500">Your order #12345 has been shipped</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t">
                  <button className="w-full text-center text-sm text-blue-500 hover:text-blue-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button className="text-gray-500 hover:text-gray-600">
            <Maximize className="h-5 w-5" />
          </button>

          {/* Apps */}
          <button className="text-gray-500 hover:text-gray-600 hidden md:block">
            <Grid className="h-5 w-5" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <Image 
                src="/images/faces/2.jpg" 
                alt="User" 
                width={32} 
                height={32} 
                className="rounded-full" 
              />
              <div className="hidden xl:block text-left">
                <p className="text-sm font-semibold">Ashton Cox</p>
                <p className="text-xs text-gray-500">Web Developer</p>
              </div>
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </a>
                <div className="border-t my-1"></div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}