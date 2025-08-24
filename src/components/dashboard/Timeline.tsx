import React from 'react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  color: string;
}

const Timeline: React.FC = () => {
  const items: TimelineItem[] = [
    {
      date: '23 Sep, 2021',
      title: 'Anita Letterback',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-red-500'
    },
    {
      date: '16 Aug, 2021',
      title: 'Paddy O\'Furniture',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-green-500'
    },
    {
      date: '23 Feb, 2021',
      title: 'Olive Yew',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-blue-500'
    },
    {
      date: '21 June, 2021',
      title: 'Maureen Biologist',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-yellow-500'
    },
    {
      date: '04 Aug, 2021',
      title: 'Peg Legge',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-teal-500'
    },
    {
      date: '04 Aug, 2021',
      title: 'Letterbac',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-blue-400'
    },
    {
      date: '23 Sep, 2021',
      title: 'Anita Letterback',
      description: 'Lorem ipsum dolor tempor incididunt.',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
      <div className="relative">
        <div className="absolute left-3 top-1 h-full w-0.5 bg-gray-200"></div>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="relative pl-10">
              <div className={`absolute left-0 w-6 h-6 rounded-full ${item.color} border-4 border-white -translate-x-1/2`}></div>
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;