import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [tasks, setTasks] = useState([]);
  


  // Functions for handling task input and list management

  //function to handle adding a new task to the list
  const addTask = () => {
  if (task.trim() === "") return;

  setTasks((prev) => [
    ...prev,
    {
      id: Date.now(),
      text: task,
      completed: false
    }
  ]);

  setTask(""); // clear input
};


  // Function to delete a task by index
  const handleDelete = (indextoDelete) => {
    const updatedList = tasks.filter((_, i) => i !== indextoDelete);
    setTasks(updatedList);
  };

  // Function to edit a task by index
  const handleEdit = (indexToEdit, newText) => {
  if (newText.trim() === "") return;
  setTasks((prevList) =>
    prevList.map((t, i) =>
      i === indexToEdit ? { ...t, text: newText } : t
    )
  );
};

  // Function to handle task completion (toggle)
  const toggleComplete = (id) => {
  setTasks((tasks) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    console.log("Updated tasks:", updated); // check this
    return updated;
  });
};



  // Render the dashboard UI
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
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
          {tasks.map((task, index) => (
          <li key={index}>
  {editIndex === index ? (
    // EDIT MODE
    <div>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={() => {handleEdit(index, editText); setEditIndex(null); setEditText("")}}>Save</button>
      <button onClick={() => setEditIndex(null)}>Cancel</button>
    </div>
  ) : (
    // VIEW MODE
    <div>
  <span
    style={{
      textDecoration: task.completed ? "line-through" : "none",
      opacity: task.completed ? 0.5 : 1
    }}
  >
    {task.text}
  </span>

  <button onClick={() => handleDelete(index)}>Delete</button>

  <button onClick={() => {
    setEditIndex(index);
    setEditText(task.text);
  }}>
    Edit
  </button>

  <button onClick={() => toggleComplete(task.id)}>
    {task.completed ? "Undo" : "Done"}
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
