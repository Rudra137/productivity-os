import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (task.trim() === "") return;

    setTaskList([...taskList, task]);
    setTask("");
  };
  const handleDelete = (indextoDelete) => {
    const updatedList = taskList.filter((_, i) => i !== indextoDelete);
    setTaskList(updatedList);
  }
  const handleEdit = (indexToEdit, newText) => {
  if (newText.trim() === "") return;

  setTaskList((prevList) =>
    prevList.map((t, i) =>
      i === indexToEdit ? newText : t
    )
  );
};

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
  {editIndex === index ? (
    // EDIT MODE
    <div>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={() => {handleEdit(index, editText); setEditIndex(null); setEditText("");}}>Save</button>
      <button onClick={() => setEditIndex(null)}>Cancel</button>
    </div>
  ) : (
    // VIEW MODE
    <div>
      <span>{t}</span>
      <button onClick={() => handleDelete(index)}>Delete</button>
      <button onClick={() => {
        setEditIndex(index);
        setEditText(t);
      }}>
        Edit
      </button>
    </div>
          )}
        </li>
       ))}
      </ul>
    </div>
    

  );
}

export default App;
