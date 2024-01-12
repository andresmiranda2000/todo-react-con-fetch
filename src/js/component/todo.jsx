import React from 'react';

const Todo = ({ index, todo, removeTodo }) => {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {todo.text}
        {todo.active && (
          <button
            onClick={() => removeTodo(index)}
            className="btn btn-light p-1 rounded-circle"
            style={{ color: 'red' }}
          >
            <strong>X</strong>
          </button>
        )}
      </li>
      <hr className="my-0" />
    </div>
  );
};

export default Todo;