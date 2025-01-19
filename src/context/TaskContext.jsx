import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const initialTasks = [
    { id: 1, title: 'Finalize venue contract', status: 'pending', dueDate: '2025-01-25', event: 'Tech Conference 2025', assignedTo: 'Sarah Johnson' },
    { id: 2, title: 'Send speaker invitations', status: 'completed', dueDate: '2025-01-28', event: 'Tech Conference 2025', assignedTo: 'Michael Chen' },
    { id: 3, title: 'Order promotional materials', status: 'in_progress', dueDate: '2025-02-01', event: 'Product Launch', assignedTo: 'Emma Davis' },
    { id: 4, title: 'Review catering options', status: 'pending', dueDate: '2025-02-05', event: 'Design Workshop', assignedTo: 'Alex Thompson' },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
    };
    setTasks(prev => [taskWithId, ...prev]);
    return taskWithId;
  };

  const updateTask = (taskId, status) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getRecentTasks = () => tasks.slice(0, 4);

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getRecentTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
