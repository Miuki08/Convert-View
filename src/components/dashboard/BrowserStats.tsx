import React from 'react';
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
    <div className="card">
      <div className="card-header pb-1">
        <h3 className="card-title mb-2">Browser Usage</h3>
      </div>
      <div className="card-body p-0">
        <div className="browser-stats">
          {stats.map((stat, index) => (
            <div key={index} className="d-flex align-items-center item border-bottom my-2 p-3">
              <div className="d-flex">
                <Image 
                  src={`/assets/images/svgicons/${stat.name.toLowerCase()}.svg`} 
                  alt={stat.name} 
                  width={32}
                  height={32}
                  className="w-8 h-8 me-3"
                />
                <div className="truncate">
                  <h6 className="font-semibold mb-0">{stat.name}</h6>
                  <span className="text-muted text-xs">{stat.company}</span>
                </div>
              </div>
              <div className="ms-auto">
                <div className="d-flex items-center">
                  <span className="me-4 mt-1 font-semibold text-base">
                    {stat.value.toLocaleString()}
                  </span>
                  <span className={`text-${stat.trend === 'up' ? 'success' : 'danger'} text-xs`}>
                    <i className={`fe fe-trending-${stat.trend} mx-2`}></i>
                    {stat.percentage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowserStats;