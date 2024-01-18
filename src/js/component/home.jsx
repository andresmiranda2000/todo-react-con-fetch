import React, { useState, useEffect } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let body = todos.concat([{ "id": Date.now(), "label": inputValue, "done": false }]);

      updateTodos(body);
    }
  };

  const handleDelete = (taskId) => {
    const updatedTodos = todos.filter((task) => task.id !== taskId);

    updateTodos(updatedTodos);
  };

  const updateTodos = (updatedTodos) => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/andresmiranda2000', {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok) throw Error(`La response no es ok`)
        return resp.json();
      })
      .then(data => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        alert(`Hay un error`)
        console.log(error);
      });
  };

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/andresmiranda2000', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok) throw Error(`La response no es ok`)
        return resp.json();
      })
      .then(data => {
        setTodos(data)
        console.log(data);
      })
      .catch(error => {
        alert(`Hay un error`)
        console.log(error);
      });
  }, [])

  return (
    <div className="container mt-5">
      <div className="card p-4 text-center">
        <h1 className="mb-4">Tareas por hacer</h1>
        <ul className="list-unstyled text-left">
          <li className="mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="¿Qué tengo que hacer?"
              className="form-control"
            />
          </li>
          {todos.length === 0 ? (
            <li className="mb-3">¡Todo completado!</li>
          ) : (
            todos.map((item) => (
              <li key={item.id} className="mb-3">
                {item.label}
                <button
                  className="btn btn-danger ml-2 btn-sm"
                  onClick={() => handleDelete(item.id)}
                > X
                </button>
              </li>
            ))
          )}
        </ul>
        {todos.length > 0 && <div>{todos.length} tarea(s) por hacer.</div>}
      </div>
    </div>
  );
};

export default Home;
