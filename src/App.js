// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleTaskAdded = (newTask) => {
    setShowForm(false);
    console.log('New task added:', newTask);
  };


  return (
    <div className="app-container">
    <h1>Task Manager</h1>
    <button 
      className="toggle-button"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? 'View Tasks' : 'Add Task'}
    </button>
      {showForm ? (
        <TaskForm onTaskAdded={handleTaskAdded} />
      ) : (
        <TaskList />
      )}
    </div>
  );
};

export default App;