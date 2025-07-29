import React, { useState } from 'react'; // Import React and useState hook

function TodoList() {
  // State to store list of tasks
  const [tasks, setTasks] = useState([]);

  // State to track the current value of input box
  const [input, setInput] = useState('');

  // Function to add a new task
  const addTask = () => {
    const trimmed = input.trim(); // Remove extra spaces
    if (trimmed !== '') {
      // Add task only if not empty
      const newTask = { text: trimmed, completed: false };
      setTasks([...tasks, newTask]); // Update the task list
      setInput(''); // Clear input box
    }
  };

  // Function to toggle completion of a task
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks]; // Copy current task list
    updatedTasks[index].completed = !updatedTasks[index].completed; // Flip completed state
    setTasks(updatedTasks); // Update state
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index); // Remove task at given index
    setTasks(filteredTasks); // Update state
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>📝 My To-Do List</h2>

      {/* Input field */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task"
        style={{ padding: '8px', width: '70%' }}
      />

      {/* Add Task button */}
      <button
        onClick={addTask}
        style={{ padding: '8px 12px', marginLeft: '10px', backgroundColor: '#28a745', color: '#fff' }}
      >
        Add Task
      </button>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Task Text */}
            <span
              onClick={() => toggleComplete(index)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {task.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: '10px', backgroundColor: 'red', color: '#fff' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
