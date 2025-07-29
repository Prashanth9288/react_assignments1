import React, { useState } from 'react';

const AdvancedTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Priority value mapping for sorting
  const priorityValue = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Add new task
  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    sortAndSetTasks(updatedTasks);
    setTitle('');
    setPriority('Medium');
  };

  // Toggle complete/incomplete
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    sortAndSetTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Sort tasks by priority
  const sortAndSetTasks = (taskList) => {
    const sorted = [...taskList].sort((a, b) => priorityValue[b.priority] - priorityValue[a.priority]);
    setTasks(sorted);
  };

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Completed' && task.completed) ||
      (filterStatus === 'Incomplete' && !task.completed);

    return matchesPriority && matchesStatus;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2> Advanced Task Manager</h2>

      {/* Add Task Section */}
      <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          style={{ flex: 1, padding: '8px' }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '8px' }}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={addTask} style={{ padding: '8px 12px', background: '#28a745', color: '#fff' }}>
          Add Task
        </button>
      </div>

      {/* Filters Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <div>
          <label>Filter Priority: </label>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label>Filter Status: </label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderLeft: task.priority === 'High' ? '5px solid red' : '5px solid transparent',
              backgroundColor: task.completed ? '#f1f1f1' : 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              onClick={() => toggleComplete(task.id)}
              style={{
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none',
                flex: 1,
              }}
            >
              {task.title} {' '}
              <span style={{ fontSize: '0.8rem', color: '#888' }}>({task.priority})</span>
            </div>
            <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedTaskManager;
