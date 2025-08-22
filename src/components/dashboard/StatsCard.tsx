import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: {
    value: string;
    isPositive: boolean;
  };
  iconBg: string;
  iconColor: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, iconBg, iconColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex">
        <div className="flex-1 p-4">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h4 className="text-xl font-semibold text-gray-800 mb-1">{value}</h4>
          <p className="text-xs text-gray-500">
            Last week
            <span className={`inline-flex items-center ml-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {trend.value}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}