"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function WelcomeCard() {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate percentage from 0 to 85
      let current = 0;
      const target = 85;
      const duration = 2000;
      const step = target / (duration / 16);
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setPercentage(Math.round(current));
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div 
      ref={cardRef}
      className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2 transition-all duration-500" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
          }}>
            Hi, Welcome Back <span className="text-blue-300">Nick!</span>
          </h3>
          <p className="text-blue-200 mb-6 transition-all duration-700 delay-100" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
          }}>
            You have used the {percentage}% of free plan storage. Please upgrade your plan to get unlimited storage.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 transition-all duration-500 delay-300" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}>
            Upgrade Now
          </button>
        </div>
        <div className="relative transition-all duration-1000 delay-300" style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-45deg)'
        }}>
          <div className="w-32 h-32 bg-blue-800/30 rounded-full flex items-center justify-center relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#1e3a8a"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (percentage / 100) * 251.2}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-700/40 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-700/20 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-indigo-700/20 rounded-full"></div>
    </div>
  );
}