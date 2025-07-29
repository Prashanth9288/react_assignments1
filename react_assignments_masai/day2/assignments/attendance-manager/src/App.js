import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', present: true },
    { id: 2, name: 'Bob', present: false },
    { id: 3, name: 'Charlie', present: true },
    { id: 4, name: 'David', present: false },
    { id: 5, name: 'Eva', present: true },
  ]);

  const [filter, setFilter] = useState('All');

  const toggleAttendance = (id) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'Present') return student.present;
    if (filter === 'Absent') return !student.present;
    return true;
  });

  const totalPresent = students.filter(s => s.present).length;

  return (
    <div className="App">
      <h1>Attendance Manager</h1>

      <div className="filter-container">
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option>All</option>
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      <ul className="student-list">
        {filteredStudents.map(student => (
          <li key={student.id} className={student.present ? 'present' : 'absent'}>
            <span>{student.name} — {student.present ? 'Present' : 'Absent'}</span>
            <button onClick={() => toggleAttendance(student.id)}>Toggle</button>
          </li>
        ))}
      </ul>

      <h2>Total Present: {totalPresent}</h2>
    </div>
  );
}

export default App;
