import React from 'react';

const WeeklyVisitors: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Visitors</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Average Male Visitors</div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 mr-2">2,132</span>
            <span className="text-green-500 text-sm font-semibold flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              0.23%
            </span>
          </div>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Average Female Visitors</div>
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 mr-2">1,053</span>
            <span className="text-red-500 text-sm font-semibold flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              0.11%
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Visitor Statistics Chart</span>
          <button className="text-blue-500 text-sm font-semibold">View Report</button>
        </div>
        <div className="h-48 flex items-end justify-between pt-4">
          {[40, 65, 50, 75, 60, 45, 70].map((height, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 rounded-t ${index % 2 === 0 ? 'bg-blue-500' : 'bg-pink-400'}`}
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyVisitors;