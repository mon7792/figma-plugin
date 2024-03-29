import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../../routes";
import { todos } from "../../type";
import { useAuth } from "../../hooks/useAuth";

function App() {
  const { authUser, login, logout, isLoggedIn, isLoading } = useAuth();
  
  
  const [title, setTitle] = useState<string>("");
  const [todo, setTodo] = useState<Array<todos>>([
    {
      id: "1",
      title: "Complete the task",
      done: false,
    },
    {
      id: "2",
      title: "Complete gym",
      done: false,
    },
  ]);

  useEffect(() => {
    getTodos();
  }, []);

  // onInputChange takes care about the input change
  const onInputChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value || "");
  };

  // onSaveClick will save the title and post it api
  const onSaveClick = (e: any) => {
    e.preventDefault();
    alert(`TODO : ${title} Saved`);
    // a. post the todo
    saveTodo(title);
    setTitle("");
    // b. get the new list of todo from the database.
    getTodos();
  };

  // saveTodo will create a new TODO with the title
  const saveTodo = (title: string) => {
    fetch("/todo", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ title: title }),
    }).then((response) => response.json());
  };

  // getTodos will retrieve all the TODOS stored in DB.
  const getTodos = () => {
    fetch("/todo", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        setTodo(resp);
      });
  };

  // setTodoDone update the done property of the todo
  const setTodoDone = (id: string) => {
    fetch("/todo", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        setTodo(resp);
      });
  };

  if (!isLoggedIn) {
    return <Navigate to={routes.LOGIN} />
  }

  if (isLoading) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Type Todo Here...</h1>
      <input value={title} onChange={onInputChange} />
      <button onClick={onSaveClick}>Save</button>
      <h1>{title}</h1>

      <h3>Current Todos...</h3>
      <ul>
        {todo.map((elem, i) => (
          <li key={i}>
            {elem.title} <button>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
