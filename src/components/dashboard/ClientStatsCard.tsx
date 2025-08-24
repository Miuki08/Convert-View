"use client";

import { usePrimaryColor } from '../hooks/usePrimaryColor';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

export default function ClientStatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  const { getColorClasses, getTextColorForBackground } = usePrimaryColor();
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex">
        <div className="flex-1 p-4">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h4 className="text-xl font-semibold text-gray-800 mb-1">{value}</h4>
          <p className="text-xs text-gray-500">
            Last week
            <span className={`inline-flex items-center ml-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className={`w-12 h-12 rounded-full ${getColorClasses('bg')} flex items-center justify-center shadow-md`}>
            <Icon className={`w-6 h-6 ${getTextColorForBackground(getColorClasses('bg'))}`} />
          </div>
        </div>
      </div>
    </div>
  );
}