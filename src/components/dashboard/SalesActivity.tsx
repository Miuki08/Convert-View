import React from 'react';

interface ActivityItem {
  country: string;
  value: string;
  trend: 'up' | 'down';
  percentage: string;
  progress: number;
  color: string;
}

const SalesActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      country: "India",
      value: "$32,879",
      trend: "down",
      percentage: "65%",
      progress: 60,
      color: "primary"
    },
    {
      country: "Russia",
      value: "$22,710",
      trend: "up",
      percentage: "55%",
      progress: 50,
      color: "info"
    },
    {
      country: "Canada",
      value: "$56,291",
      trend: "down",
      percentage: "69%",
      progress: 80,
      color: "secondary"
    },
    {
      country: "Brazil",
      value: "$34,209",
      trend: "up",
      percentage: "60%",
      progress: 60,
      color: "warning"
    },
    {
      country: "United States",
      value: "$45,870",
      trend: "up",
      percentage: "86%",
      progress: 80,
      color: "danger"
    },
    {
      country: "Germany",
      value: "$67,357",
      trend: "up",
      percentage: "73%",
      progress: 70,
      color: "success"
    },
    {
      country: "U.A.E",
      value: "$56,291",
      trend: "down",
      percentage: "69%",
      progress: 80,
      color: "purple"
    }
  ];

  return (
    <div className="card">
      <div className="card-header pb-3">
        <h3 className="card-title mb-2">SALES ACTIVITY</h3>
      </div>
      <div className="card-body p-0 customers mt-1">
        <div className="country-card pt-0">
          {activities.map((activity, index) => (
            <div key={index} className="mb-4 p-3">
              <div className="d-flex">
                <span className="text-sm font-semibold">{activity.country}</span>
                <div className="ms-auto">
                  <span className={`text-${activity.trend === 'up' ? 'success' : 'danger'} mx-1`}>
                    <i className={`fe fe-trending-${activity.trend}`}></i>
                  </span>
                  <span className="number-font">{activity.value}</span> ({activity.percentage})
                </div>
              </div>
              <div className="progress h-2 rounded-md mt-2">
                <div 
                  className={`progress-bar progress-bar-striped progress-bar-animated bg-${activity.color}`} 
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesActivity;