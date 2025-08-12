import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import '../src/App.css';
import'../src/index.css';

function App() {
  return (
    <div className="app-container">
      <h2>Redux Todo List</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
