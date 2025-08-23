"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface Customer {
  id: number;
  name: string;
  userId: string;
  avatar: string;
  status: 'paid' | 'pending';
}

const RecentCustomers = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: 'Samantha Melon',
      userId: '#1234',
      avatar: '/assets/images/faces/2.jpg',
      status: 'paid'
    },
    {
      id: 2,
      name: 'Allie Grater',
      userId: '#1234',
      avatar: '/assets/images/faces/1.jpg',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Gabe Lackmen',
      userId: '#1234',
      avatar: '/assets/images/faces/5.jpg',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Manuel Labor',
      userId: '#1234',
      avatar: '/assets/images/faces/7.jpg',
      status: 'paid'
    },
    {
      id: 5,
      name: 'Hercules Bing',
      userId: '#1754',
      avatar: '/assets/images/faces/9.jpg',
      status: 'paid'
    },
    {
      id: 6,
      name: 'Manuel Labor',
      userId: '#1234',
      avatar: '/assets/images/faces/11.jpg',
      status: 'pending'
    }
  ];

  const [visibleCustomers, setVisibleCustomers] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const customerId = parseInt(entry.target.getAttribute('data-customer-id') || '0');
            setVisibleCustomers(prev => [...prev, customerId]);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    if (containerRef.current) {
      const customerElements = containerRef.current.querySelectorAll('.customer-item');
      customerElements.forEach(customer => observer.observe(customer));
    }

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: 'paid' | 'pending') => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const getStatusIcon = (status: 'paid' | 'pending') => {
    return status === 'paid' 
      ? (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
      : (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Recent Customers
        </h3>
        <p className="text-sm text-gray-500 mt-1">Latest customer transactions</p>
      </div>
      
      <div className="p-0" ref={containerRef}>
        <div className="divide-y divide-gray-100">
          {customers.map((customer, index) => (
            <div
              key={customer.id}
              data-customer-id={customer.id}
              className={`customer-item p-4 transition-all duration-500 ease-out ${
                visibleCustomers.includes(customer.id) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-6'
              } hover:bg-blue-50/50 cursor-pointer`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className="relative flex-shrink-0">
                  <div className="relative">
                    <Image
                      className="w-12 h-12 rounded-full shadow-md object-cover border-2 border-white"
                      src={customer.avatar}
                      alt={customer.name}
                      width={48}
                      height={48}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      customer.status === 'paid' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                </div>
                
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">{customer.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">ID: {customer.userId}</p>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)} transition-all duration-300 hover:scale-105`}>
                    {getStatusIcon(customer.status)}
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* View All Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center">
          View All Customers
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecentCustomers;