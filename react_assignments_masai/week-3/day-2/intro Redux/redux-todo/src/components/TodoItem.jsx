import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-item">
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{ textDecoration: todo.status ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {todo.title}
      </span>
      <button className="delete-btn" onClick={() => dispatch(deleteTodo(todo.id))}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
