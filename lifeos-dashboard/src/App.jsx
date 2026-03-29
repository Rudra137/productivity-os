import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    setTaskList([...taskList, task]);
    setTask("");
  };
  const handleDelete = (indextoDelete) => {
    const updatedList = taskList.filter((_, i) => i !== indextoDelete);
    setTaskList(updatedList);
  }


  return (
    <div style={{ padding: "20px" }}>
      <h1>LifeOS Dashboard</h1>

      <div>
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
          {taskList.map((t, index) => (
            <li key={index}>
              {t}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
         ))}
      </ul>
    </div>
  );
}

export default App;
