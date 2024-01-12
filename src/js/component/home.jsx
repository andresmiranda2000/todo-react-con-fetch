import React, { useState, useEffect } from 'react';
import Todo from './todo';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const syncWithServer = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/andresmiranda2000", {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error syncing with server:', response.status);
      }
    } catch (error) {
      console.error('Error syncing with server:', error);
    }
  };

  const addTodo = async (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      e.preventDefault();
      const updatedTodos = [...todos, { text: newTodo, active: true }];
      setTodos(updatedTodos);
      await syncWithServer();
      setNewTodo('');
    }
  };

  const removeTodo = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);
    await syncWithServer();
  };

  const clearAllTodos = async () => {
    setTodos([]);
    await syncWithServer();
  };

  const countActiveTodos = () => {
    return todos.filter((todo) => todo.active).length;
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/andresmiranda2000", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.error('Error fetching todos:', response.status);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Todos</h1>
      <div className="card p-3 mx-auto" style={{ maxWidth: '400px' }}>
        <form>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="form-control mb-3"
            placeholder="Nueva tarea"
            onKeyPress={addTodo}
          />
        </form>
        {todos.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (
          <div>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            ))}
            <p className="text-left mt-3">
              {countActiveTodos()} {countActiveTodos() !== 1 ? 'tareas' : 'tarea'} por hacer
            </p>
            <button className="btn btn-danger" onClick={clearAllTodos}>
              Limpiar todas las tareas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
