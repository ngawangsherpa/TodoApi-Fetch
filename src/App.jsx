import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setTasks(data.slice(0, 5));
    } catch (error) {
      console.log("Error");
    }
  };

  const addFromUrl = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/6");
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="con">
      <div className="todo">
        <h1>To-Do List</h1>
        <div className="btn">
          <button onClick={addFromUrl}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task">
              {task.title}{" "}
              <button onClick={() => removeTask(task.id)} className="rbtn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
