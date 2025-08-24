"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface CostItem {
  name: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  progress: number;
  color: string;
}

const WarehouseOperatingCosts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const costs = useMemo<CostItem[]>(() => [
    {
      name: 'Order Picking',
      value: '3,876',
      trend: { value: '03%', isPositive: true },
      progress: 60,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Storage',
      value: '2,178',
      trend: { value: '16%', isPositive: false },
      progress: 50,
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Shipping',
      value: '1,367',
      trend: { value: '06%', isPositive: true },
      progress: 80,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Receiving',
      value: '678',
      trend: { value: '25%', isPositive: false },
      progress: 40,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      name: 'Review',
      value: '578',
      trend: { value: '55%', isPositive: true },
      progress: 70,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Profit',
      value: '$27,215',
      trend: { value: '32%', isPositive: true },
      progress: 85,
      color: 'from-teal-500 to-teal-600'
    }
  ], []);

  // Animate progress bars one by one
  useEffect(() => {
    if (!isVisible) return;
    
    const timeouts: NodeJS.Timeout[] = [];
    
    costs.forEach((cost, index) => {
      timeouts.push(
        setTimeout(() => {
          setAnimatedProgress(prev => {
            const newProgress = [...prev];
            newProgress[index] = 0;
            return newProgress;
          });
          
          // Animate progress from 0 to target value
          const startTime = Date.now();
          const duration = 1500; // 1.5 seconds per bar
          const targetProgress = cost.progress;
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentProgress = progress * targetProgress;
            
            setAnimatedProgress(prev => {
              const newProgress = [...prev];
              newProgress[index] = currentProgress;
              return newProgress;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }, index * 300) // Delay each animation by 300ms
      );
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isVisible, costs]);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100 max-w-lg mx-auto"
    >
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800">Warehouse Operating Costs</h3>
        <div className="animate-pulse bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          Live
        </div>
      </div>
      
      <div className="space-y-5">
        {costs.map((cost, index) => (
          <div 
            key={index} 
            className="group transition-all duration-300 ease-out hover:bg-gray-50 p-3 rounded-lg"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                {cost.name}
                <span className="ml-2 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  {animatedProgress[index] !== undefined ? Math.round(animatedProgress[index]) + '%' : '0%'}
                </span>
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold mr-2">{cost.value}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${cost.trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {cost.trend.isPositive ? '↑' : '↓'} {cost.trend.value}
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden relative">
              {/* Animated progress bar with gradient */}
              <div 
                className={`bg-gradient-to-r ${cost.color} h-2.5 rounded-full transition-all duration-300 ease-out relative`}
                style={{ 
                  width: `${animatedProgress[index] || 0}%`,
                }}
              >
                {/* Shimmer effect for download animation */}
                <div className="absolute top-0 left-0 w-10 h-2.5 bg-white opacity-30 animate-shimmer"></div>
              </div>
              
              {/* Progress indicator dots */}
              <div className="absolute inset-0 flex items-center">
                {[0, 25, 50, 75, 100].map((point) => (
                  <div 
                    key={point} 
                    className="absolute w-1 h-1 rounded-full bg-white bg-opacity-50"
                    style={{ left: `${point}%`, transform: 'translateX(-50%)' }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WarehouseOperatingCosts;