import React, { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return; 
    const newTask = {
      id: crypto.randomUUID(), 
      title: task.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTask(''); 
  };

  
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="container">
      <h1 className="title">grocery bud</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              className={t.completed ? 'completed' : ''}
              onClick={() => handleToggle(t.id)}
            >
              {t.title}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.some((t) => t.completed) && (
        <button className="clear-btn" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default App;
