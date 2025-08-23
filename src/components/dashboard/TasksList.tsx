"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  badge?: {
    text: string;
    color: string;
  };
}

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: "accurate information at any given point.",
      completed: false,
      badge: { text: "Today", color: "primary" }
    },
    {
      id: 2,
      text: "sharing the information with clients or stakeholders.",
      completed: false,
      badge: { text: "Today", color: "primary" }
    },
    {
      id: 3,
      text: "Hearing the information and responding.",
      completed: false,
      badge: { text: "22 hrs", color: "primary" }
    },
    {
      id: 4,
      text: "Setting up and customizing your own sales.",
      completed: false,
      badge: { text: "1 Day", color: "light" }
    },
    {
      id: 5,
      text: "To have a complete 360° overview of sales information, having.",
      completed: true,
      badge: { text: "2 Days", color: "light" }
    },
    {
      id: 6,
      text: "sharing the information with clients or stakeholders.",
      completed: false,
      badge: { text: "Today", color: "primary" }
    },
    {
      id: 7,
      text: "New Admin Launched.",
      completed: true
    },
    {
      id: 8,
      text: "To maximize profits and improve productivity.",
      completed: true
    }
  ]);

  const [visibleTasks, setVisibleTasks] = useState<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const taskId = parseInt(entry.target.getAttribute('data-task-id') || '0');
            setVisibleTasks(prev => [...prev, taskId]);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (listRef.current) {
      const taskElements = listRef.current.querySelectorAll('.task-item');
      taskElements.forEach(task => observer.observe(task));
    }

    return () => observer.disconnect();
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getBadgeColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: "bg-blue-100 text-blue-800",
      light: "bg-gray-100 text-gray-800"
    };
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          MAIN TASKS
        </h3>
      </div>
      <div className="p-0" ref={listRef}>
        <div className="divide-y divide-gray-100">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              data-task-id={task.id}
              className={`task-item p-4 flex items-center transition-all duration-500 ease-out ${
                visibleTasks.includes(task.id) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-6'
              } ${task.completed ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="relative">
                  <input
                    className="form-check-input h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer transition-all duration-200"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  {task.completed && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-blue-600 rounded border-blue-600 animate-ping-once">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className={`ml-3 text-sm flex-1 min-w-0 transition-all duration-300 ${
                  task.completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-700'
                }`}>
                  {task.text}
                </span>
              </div>
              
              {task.badge && (
                <span className="ml-3 flex-shrink-0">
                  <span className={`badge ${getBadgeColorClass(task.badge.color)} px-2 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105`}>
                    {task.badge.text}
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Add new task input */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Add new task..." 
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksList;