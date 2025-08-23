"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface BrowserStatItem {
  name: string;
  company: string;
  value: number;
  trend: 'up' | 'down';
  percentage: string;
}

const BrowserStats: React.FC = () => {
  const stats: BrowserStatItem[] = [
    {
      name: "Chrome",
      company: "Google, Inc.",
      value: 35502,
      trend: "up",
      percentage: "12.75%"
    },
    {
      name: "Edge",
      company: "Microsoft Corporation, Inc.",
      value: 25364,
      trend: "down",
      percentage: "24.37%"
    },
    {
      name: "Firefox",
      company: "Mozilla Foundation, Inc.",
      value: 14635,
      trend: "up",
      percentage: "15.63%"
    },
    {
      name: "Safari",
      company: "Apple Corporation, Inc.",
      value: 35657,
      trend: "up",
      percentage: "12.54%"
    },
    {
      name: "Opera",
      company: "Opera, Inc.",
      value: 12563,
      trend: "down",
      percentage: "15.12%"
    }
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="p-6 border-b border-blue-700">
        <h3 className="text-2xl font-bold mb-1 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Browser Usage
        </h3>
        <p className="text-blue-200 text-sm">Real-time browser usage statistics</p>
      </div>
      <div className="p-0">
        <div className="browser-stats">
          {stats.map((stat, index) => (
            <BrowserStatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BrowserStatItem: React.FC<{ stat: BrowserStatItem; index: number }> = ({ stat, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (itemRef.current) {
            observer.unobserve(itemRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && valueRef.current) {
      // Animate counting up
      const targetValue = stat.value;
      const duration = 1500;
      const step = targetValue / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(current).toLocaleString();
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);

  return (
    <div 
      ref={itemRef}
      className={`border-b border-blue-700 last:border-b-0 p-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 rounded-lg bg-blue-800 flex items-center justify-center p-2 shadow-md">
            <Image 
              src={`/assets/images/svgicons/${stat.name.toLowerCase()}.svg`} 
              alt={stat.name} 
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </div>
        
        <div className="ml-4 flex-grow">
          <h6 className="font-bold text-lg mb-0">{stat.name}</h6>
          <span className="text-blue-300 text-xs">{stat.company}</span>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end">
            <span ref={valueRef} className="font-bold text-lg mr-3">
              0
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${stat.trend === 'up' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
              {stat.trend === 'up' ? (
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {stat.percentage}
            </span>
          </div>
          <div className="w-32 bg-blue-800 rounded-full h-2 mt-2 ml-auto">
            <div 
              className={`h-2 rounded-full ${stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ 
                width: isVisible ? `${parseFloat(stat.percentage)}%` : '0%',
                transition: 'width 1s ease-out',
                transitionDelay: `${index * 100 + 500}ms`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserStats;