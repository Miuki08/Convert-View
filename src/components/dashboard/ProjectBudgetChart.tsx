"use client";

import React, { useState } from 'react';

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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="card">
      <div className="card-header pb-3">
        <h3 className="card-title mb-2">MAIN TASKS</h3>
      </div>
      <div className="card-body p-0 customers mt-1">
        <div>
          {tasks.map(task => (
            <label key={task.id} className="p-2 d-flex items-center">
              <span className="form-check mb-0 ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
              </span>
              <span className="mx-3 my-auto flex-grow">
                {task.text}
              </span>
              {task.badge && (
                <span className="ms-auto">
                  <span className={`badge bg-${task.badge.color}-transparent font-semibold px-2 py-1 text-xs me-2`}>
                    {task.badge.text}
                  </span>
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksList;