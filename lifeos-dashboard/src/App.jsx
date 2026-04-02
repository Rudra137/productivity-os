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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const btnStyle = {
  marginLeft: "5px",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#ddd"
  }

  // Render the dashboard UI
  return (
    // Main container with padding
    

  <div style={{  padding: "30px",
      maxWidth: "600px",
      margin: "auto",
      fontFamily: "sans-serif" }}>
          <h1>LifeOS Dashboard</h1>


      {/* 🟦 STATS SECTION */}
      <div style={{
      marginBottom: "20px",
      padding: "10px",
      border: "1px solid #aaa",
      borderRadius: "10px"
        }}>
      <h3>📊 Daily Stats</h3>
      <p>Total: {totalTasks}</p>
      <p>Completed: {completedTasks}</p>
      <p>Pending: {pendingTasks}</p>
    </div>

   {/*  INPUT SECTION */}
  <div style={{
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px"
  }}>
    <h3 style={{ marginBottom: "10px" }}>Add Task</h3>
    
    <input
      type="text"
      placeholder="Enter task..."
      value={task}
      onChange={(e) => setTask(e.target.value)}
          style={{
      padding: "10px",
      width: "70%",
      marginRight: "10px",
      borderRadius: "8px",
      border: "1px solid #c5a6a6"
    }}
    />
    
    <button onClick={addTask} style={{
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  }}>Add Task</button>
  </div>

  {/* 🟩 TASK LIST SECTION */}
  <div style={{
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    
  }}>
    <h3 style={{ marginBottom: "10px" }}>Your Tasks</h3>


      <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
          <li key={index} style={{
  marginBottom: "10px",
  padding: "12px",
  borderRadius: "10px",
  background: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
}}>
  {editIndex === index ? (
    

    // EDIT MODE
    <div>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={() => {handleEdit(index, editText); setEditIndex(null); setEditText("")}} style={btnStyle}>Save</button>
      <button onClick={() => setEditIndex(null)} style={btnStyle}>Cancel</button>
    </div>
  ) : (
    // VIEW MODE
    <div>
  <span
    style={{
  textDecoration: task.completed ? "line-through" : "none",
  color: task.completed ? "gray" : "black",
  fontWeight: task.completed ? "normal" : "500"
}}
  >
    {task.text}
  </span>

  <button onClick={() => handleDelete(index)} style={btnStyle}>Delete</button>

  <button onClick={() => {
    setEditIndex(index);
    setEditText(task.text);
  }} style={btnStyle}>
    Edit
  </button>

  <button onClick={() => toggleComplete(task.id)} style={btnStyle}>
    {task.completed ? "Undo" : "Done"}
  </button>
</div>
          )}
        </li>
       ))}
      </ul>
    </div>
  </div>  

  );
}


export default App;
