"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalHeader from './HorizontalHeader';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [navigationStyle, setNavigationStyle] = useState('light');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');
  const [headerStyle, setHeaderStyle] = useState('light');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // New states for additional switcher options
  const [menuStyle, setMenuStyle] = useState('click');
  const [sidemenuLayout, setSidemenuLayout] = useState('default');
  const [pageStyle, setPageStyle] = useState('regular');
  const [layoutWidth, setLayoutWidth] = useState('full');
  const [menuPosition, setMenuPosition] = useState('fixed');
  const [headerPosition, setHeaderPosition] = useState('fixed');
  const [loaderEnabled, setLoaderEnabled] = useState(false);
  const [themeBackground, setThemeBackground] = useState('primary-1');
  const [menuBackground, setMenuBackground] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    const savedNavStyle = localStorage.getItem('navigationStyle');
    const savedDirection = localStorage.getItem('direction');
    const savedLayout = localStorage.getItem('layout');
    const savedHeaderStyle = localStorage.getItem('headerStyle');
    const savedTheme = localStorage.getItem('theme');
    const savedMenuStyle = localStorage.getItem('menuStyle');
    const savedSidemenuLayout = localStorage.getItem('sidemenuLayout');
    const savedPageStyle = localStorage.getItem('pageStyle');
    const savedLayoutWidth = localStorage.getItem('layoutWidth');
    const savedMenuPosition = localStorage.getItem('menuPosition');
    const savedHeaderPosition = localStorage.getItem('headerPosition');
    const savedLoaderEnabled = localStorage.getItem('loaderEnabled');
    const savedThemeBackground = localStorage.getItem('themeBackground');
    const savedMenuBackground = localStorage.getItem('menuBackground');
    
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

    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Load new settings
    if (savedMenuStyle) setMenuStyle(savedMenuStyle);
    if (savedSidemenuLayout) setSidemenuLayout(savedSidemenuLayout);
    if (savedPageStyle) setPageStyle(savedPageStyle);
    if (savedLayoutWidth) setLayoutWidth(savedLayoutWidth);
    if (savedMenuPosition) setMenuPosition(savedMenuPosition);
    if (savedHeaderPosition) setHeaderPosition(savedHeaderPosition);
    if (savedLoaderEnabled) setLoaderEnabled(savedLoaderEnabled === 'true');
    if (savedThemeBackground) setThemeBackground(savedThemeBackground);
    if (savedMenuBackground) setMenuBackground(savedMenuBackground);

    // Simulate initial page load
    if (savedLoaderEnabled === 'true') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsInitialLoad(false);
    }
  }, []);

  // Handle route changes untuk App Router
  useEffect(() => {
    if (!loaderEnabled || isInitialLoad) return;

    // Show loader ketika route berubah
    setIsLoading(true);

    // Hide loader setelah delay (simulasi loading)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, loaderEnabled, isInitialLoad]);

  // Auto-hide loader fallback
  useEffect(() => {
    if (!loaderEnabled || !isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Timeout 5 detik sebagai fallback

    return () => clearTimeout(timer);
  }, [loaderEnabled, isLoading]);

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

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Save new settings
  useEffect(() => {
    localStorage.setItem('menuStyle', menuStyle);
  }, [menuStyle]);

  useEffect(() => {
    localStorage.setItem('sidemenuLayout', sidemenuLayout);
  }, [sidemenuLayout]);

  useEffect(() => {
    localStorage.setItem('pageStyle', pageStyle);
  }, [pageStyle]);

  useEffect(() => {
    localStorage.setItem('layoutWidth', layoutWidth);
  }, [layoutWidth]);

  useEffect(() => {
    localStorage.setItem('menuPosition', menuPosition);
  }, [menuPosition]);

  useEffect(() => {
    localStorage.setItem('headerPosition', headerPosition);
  }, [headerPosition]);

  useEffect(() => {
    localStorage.setItem('loaderEnabled', loaderEnabled.toString());
  }, [loaderEnabled]);

  useEffect(() => {
    localStorage.setItem('themeBackground', themeBackground);
  }, [themeBackground]);

  useEffect(() => {
    localStorage.setItem('menuBackground', menuBackground);
  }, [menuBackground]);

  // Apply layout width class to body
  useEffect(() => {
    if (layoutWidth === 'boxed') {
      document.body.classList.add('boxed-layout');
    } else {
      document.body.classList.remove('boxed-layout');
    }
  }, [layoutWidth]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleDirectionChange = (newDirection: 'ltr' | 'rtl') => {
    setDirection(newDirection);
  };

  const handleLayoutChange = (newLayout: 'vertical' | 'horizontal') => {
    setLayout(newLayout);
  };

  const handleHeaderStyleChange = (newHeaderStyle: string) => {
    setHeaderStyle(newHeaderStyle);
  };

  const handleNavigationStyleChange = (newNavigationStyle: string) => {
    setNavigationStyle(newNavigationStyle);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const handleMenuStyleChange = (newMenuStyle: string) => {
    setMenuStyle(newMenuStyle);
  };

  const handleSidemenuLayoutChange = (newSidemenuLayout: string) => {
    setSidemenuLayout(newSidemenuLayout);
  };

  const handlePageStyleChange = (newPageStyle: string) => {
    setPageStyle(newPageStyle);
  };

  const handleLayoutWidthChange = (newLayoutWidth: string) => {
    setLayoutWidth(newLayoutWidth);
  };

  const handleMenuPositionChange = (newMenuPosition: string) => {
    setMenuPosition(newMenuPosition);
  };

  const handleHeaderPositionChange = (newHeaderPosition: string) => {
    setHeaderPosition(newHeaderPosition);
  };

  const handleLoaderChange = (enabled: boolean) => {
    setLoaderEnabled(enabled);
    if (!enabled) {
      setIsLoading(false);
    }
  };

  const handleThemeBackgroundChange = (newThemeBackground: string) => {
    setThemeBackground(newThemeBackground);
  };

  const handleMenuBackgroundChange = (newMenuBackground: string) => {
    setMenuBackground(newMenuBackground);
  };

  return (
    <div className={`flex h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ${layoutWidth === 'boxed' ? 'max-w-7xl mx-auto' : ''}`} dir={direction}>
      {/* Loader - dikontrol oleh isLoading */}
      {loaderEnabled && isLoading && (
        <div id="loader" className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
          <Image 
            src="/assets/images/media/loader.svg" 
            alt="Loading..." 
            width={64}
            height={64}
            className="w-16 h-16 animate-spin"
            priority
          />
        </div>
      )}
      
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
        {/* Header */}
        {layout === 'horizontal' ? (
          <HorizontalHeader 
            navigationStyle={navigationStyle}
            headerStyle={headerStyle}
            onNavigationStyleChange={handleNavigationStyleChange}
            onHeaderStyleChange={handleHeaderStyleChange}
            onDirectionChange={handleDirectionChange}
            onLayoutChange={handleLayoutChange}
            onThemeChange={handleThemeChange}
            currentDirection={direction}
            currentLayout={layout}
            currentTheme={theme}
            onMenuStyleChange={handleMenuStyleChange}
            menuStyle={menuStyle}
            onSidemenuLayoutChange={handleSidemenuLayoutChange}
            sidemenuLayout={sidemenuLayout}
            onPageStyleChange={handlePageStyleChange}
            pageStyle={pageStyle}
            onLayoutWidthChange={handleLayoutWidthChange}
            layoutWidth={layoutWidth}
            onMenuPositionChange={handleMenuPositionChange}
            menuPosition={menuPosition}
            onHeaderPositionChange={handleHeaderPositionChange}
            headerPosition={headerPosition}
            onLoaderChange={handleLoaderChange}
            loaderEnabled={loaderEnabled}
            onThemeBackgroundChange={handleThemeBackgroundChange}
            themeBackground={themeBackground}
            onMenuBackgroundChange={handleMenuBackgroundChange}
            menuBackground={menuBackground}
          />
        ) : (
          <Header 
            setSidebarOpen={setSidebarOpen} 
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            onNavigationStyleChange={handleNavigationStyleChange}
            currentNavigationStyle={navigationStyle}
            headerStyle={headerStyle}
            onHeaderStyleChange={handleHeaderStyleChange}
            onDirectionChange={handleDirectionChange}
            onLayoutChange={handleLayoutChange}
            currentDirection={direction}
            currentLayout={layout}
            onThemeChange={handleThemeChange}
            currentTheme={theme}
            onMenuStyleChange={handleMenuStyleChange}
            menuStyle={menuStyle}
            onSidemenuLayoutChange={handleSidemenuLayoutChange}
            sidemenuLayout={sidemenuLayout}
            onPageStyleChange={handlePageStyleChange}
            pageStyle={pageStyle}
            onLayoutWidthChange={handleLayoutWidthChange}
            layoutWidth={layoutWidth}
            onMenuPositionChange={handleMenuPositionChange}
            menuPosition={menuPosition}
            onHeaderPositionChange={handleHeaderPositionChange}
            headerPosition={headerPosition}
            onLoaderChange={handleLoaderChange}
            loaderEnabled={loaderEnabled}
            onThemeBackgroundChange={handleThemeBackgroundChange}
            themeBackground={themeBackground}
            onMenuBackgroundChange={handleMenuBackgroundChange}
            menuBackground={menuBackground}
          />
        )}
        
        {/* Main content */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-0 scrollbar-hide ${menuPosition === 'scrollable' ? 'menu-scrollable' : ''} ${headerPosition === 'scrollable' ? 'header-scrollable' : ''}`}>
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