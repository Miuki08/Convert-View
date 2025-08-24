"use client";

import React, { useEffect, useState } from 'react';

interface SalesActivityItem {
  country: string;
  value: string;
  percentage: string;
  trend: {
    isPositive: boolean;
  };
  progress: number;
  color: string;
}

// SVG Icons
const ChartIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CountryFlag = ({ country }: { country: string }) => {
  // Simple flag representation using circles with country code
  const countryCode = country.substring(0, 2).toUpperCase();
  const colorMap: Record<string, string> = {
    IN: 'bg-green-500', // India
    RU: 'bg-blue-500',  // Russia
    CA: 'bg-red-500',   // Canada
    BR: 'bg-yellow-500',// Brazil
    US: 'bg-blue-600',  // United States
    DE: 'bg-yellow-400',// Germany
    UA: 'bg-green-400', // U.A.E (using UAE's green)
  };

  const defaultColor = 'bg-purple-500';
  
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${colorMap[countryCode] || defaultColor} mr-2`}>
      {countryCode}
    </div>
  );
};

const TrendIcon = ({ isPositive }: { isPositive: boolean }) => (
  isPositive ? (
    <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
);

const SalesActivity: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressAnimation, setProgressAnimation] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate progress bars sequentially
    const timer = setTimeout(() => {
      setProgressAnimation([65, 55, 69, 60, 86, 73, 69]);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const activities: SalesActivityItem[] = [
    {
      country: 'India',
      value: '$32,879',
      percentage: '65%',
      trend: { isPositive: false },
      progress: 65,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      country: 'Russia',
      value: '$22,710',
      percentage: '55%',
      trend: { isPositive: true },
      progress: 55,
      color: 'bg-gradient-to-r from-blue-400 to-blue-500'
    },
    {
      country: 'Canada',
      value: '$56,291',
      percentage: '69%',
      trend: { isPositive: false },
      progress: 69,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      country: 'Brazil',
      value: '$34,209',
      percentage: '60%',
      trend: { isPositive: true },
      progress: 60,
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    },
    {
      country: 'United States',
      value: '$45,870',
      percentage: '86%',
      trend: { isPositive: true },
      progress: 86,
      color: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    {
      country: 'Germany',
      value: '$67,357',
      percentage: '73%',
      trend: { isPositive: true },
      progress: 73,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      country: 'U.A.E',
      value: '$56,291',
      percentage: '69%',
      trend: { isPositive: false },
      progress: 69,
      color: 'bg-gradient-to-r from-purple-400 to-purple-500'
    }
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hover:shadow-xl relative overflow-hidden`}>
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-purple-100 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <ChartIcon />
        SALES ACTIVITY
      </h3>
      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="mb-5 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <CountryFlag country={activity.country} />
                {activity.country}
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold mr-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {activity.value}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center ${activity.trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <TrendIcon isPositive={activity.trend.isPositive} />
                  {activity.percentage}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className={`${activity.color} h-3 rounded-full transition-all duration-1000 ease-out`} 
                style={{ 
                  width: `${progressAnimation[index] || 0}%`,
                  transitionDelay: `${index * 150 + 300}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesActivity;