"use client";

import React from 'react';
import Chart from 'react-apexcharts';

const ProjectBudgetChart: React.FC = () => {
  const options = {
    chart: {
      height: 350,
      type: 'line' as const,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    colors: ['#5b67c7'],
    grid: {
      borderColor: '#f2f6f7',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    }
  };

  const series = [{
    name: 'Project Budget',
    data: [30, 45, 35, 55, 40, 60, 50]
  }];

  return (
    <div className="card custom-card overflow-hidden">
      <div className="card-header border-bottom-0">
        <div>
          <h3 className="card-title mb-2">Project Budget</h3>
        </div>
      </div>
      <div className="card-body">
        <Chart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default ProjectBudgetChart;