import { useState } from "react";
import { useEffect } from "react";


function App() {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
  const [streak, setStreak] = useState(() => {
  const saved = localStorage.getItem("streak");
  return saved ? JSON.parse(saved) : 0;
});

  const [lastCheckedDate, setLastCheckedDate] = useState(() => {
  return localStorage.getItem("lastCheckedDate") || null;
});

  

  // Functions for handling task input and list management

useEffect(() => {
  console.log("Saving to localStorage:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

useEffect(() => {
  localStorage.setItem("streak", JSON.stringify(streak));
}, [streak]);

useEffect(() => {
  if (lastCheckedDate) {
    localStorage.setItem("lastCheckedDate", lastCheckedDate);
  }
}, [lastCheckedDate]);


  //function to handle adding a new task to the list
  const addTask = () => {
  if (task.trim() === "") return;

  setTasks((prev) => [
    ...prev,
    {
      id: Date.now(),
      text: task,
      completed: false,
      category: category,
      priority: priority,
      date: new Date().toLocaleDateString()
    }
  ]);

  setTask("");
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
  
  const today = new Date().toLocaleDateString();
  const todaysTasks = tasks.filter(
  (task) => task.date === today
);
const filteredTasks = todaysTasks.filter((task) => {
  // Status filter
  if (filter === "Completed" && !task.completed) return false;
  if (filter === "Pending" && task.completed) return false;

  // Category filter
  if (categoryFilter !== "All" && task.category !== categoryFilter) return false;

  return true;
});

// Calculate stats for the dashboard
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Button style for edit/delete/done buttons
  const btnStyle = {
  marginLeft: "5px",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#ddd"
  }

  // Calculate today's stats
  const total = todaysTasks.length;
  const completed = todaysTasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Check for streaks
  useEffect(() => {
  const today = new Date().toLocaleDateString();

  // Prevent multiple updates in same day
  if (lastCheckedDate === today) return;

  if (total > 0) {
    if (percent >= 70) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setLastCheckedDate(today);
  }
}, [tasks]); // runs when tasks update

  // Render the dashboard UI
  return (
    // Main container with padding and centered content
    
  <div style={{  padding: "30px",
      maxWidth: "600px",
      margin: "auto",
      fontFamily: "sans-serif" }}>
          <h1>LifeOS Dashboard</h1>


{/* 🟩 PROGRESS BAR SECTION */}
    <div style={{
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "#f0f0f0"
}}>
  <h3>📊 Daily Progress</h3>

  <div style={{
    height: "20px",
    background: "#ddd",
    borderRadius: "10px",
    overflow: "hidden"
  }}>
    <div style={{
      width: `${percent}%`,
      height: "100%",
      background: percent === 100 ? "green" : percent > 50 ? "orange" : "red",
      transition: "0.3s"
      
    }}>
      
    </div>
  </div>

  <p style={{ marginTop: "8px" }}>
    {completed} / {total} tasks completed ({percent}%)
  </p>

    <div>
    <div style={{
  marginTop: "10px",    
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "10px",
  background: "#fff3cd"
}}>
  <h3>🔥 Streak: {streak} days</h3>
  <p>
    Today: {Math.round(percent)}% completed
  </p>
  </div>
  </div>
</div>


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
    
    <div>
      <select
      
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  div style={{ marginRight: "5px",marginTop: "10px", padding: "10px", border: "1px solid #aaa", borderRadius: "10px" }}
>
  <h5>Category</h5>
  <option>General</option>
  <option>Work</option>
  <option>Study</option>
  <option>Health</option>
</select>

<select

  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  div style={{ marginRight: "5px",marginTop: "10px", padding: "10px", border: "1px solid #aaa", borderRadius: "10px" }}
>
  <h5>Priority</h5>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
  
</select>


    <button onClick={addTask} style={{
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  }}>Add Task</button>
    </div>
  </div>

  

  {/* 🟩 TASK LIST SECTION */}
  <div style={{
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    
  }}>
    <h3 style={{ marginBottom: "10px" }}>Your Tasks</h3>
    <div style={{ marginBottom: "10px" }}>
</div>
  <div>
  <div style={{ marginBottom: "10px", alignItems: "center", gap: "8px", }}>
  <button onClick={() => setFilter("All")} style={filter === "All" ? { background: "#fcfa93" } : {}} >
    All
  </button>
  <button onClick={() => setFilter("Completed")} style={filter === "Completed" ? { background: "#fcfa93" } : {}} >
    Completed
  </button>
  <button onClick={() => setFilter("Pending")} style={filter === "Pending" ? { background: "#fcfa93" } : {}} >
    Pending
  </button>
  </div>


  <div style={{ marginBottom: "10px", alignItems: "center", gap: "8px", }}> 
  Category:
  <button onClick={() => setCategoryFilter("Work")}style={{background: categoryFilter === "Work" ? "#4CAF50" : "#ddd"}}>
  Work
  </button>
  <button onClick={() => setCategoryFilter("Study")} style={{background: categoryFilter === "Study" ? "#4CAF50" : "#ddd"}}>
    Study
  </button>
  <button onClick={() => setCategoryFilter("Health")} style={{background: categoryFilter === "Health" ? "#4CAF50" : "#ddd"}}>
    Health
  </button>
  <button onClick={() => setCategoryFilter("General")} style={{background: categoryFilter === "General" ? "#4CAF50" : "#ddd"}}>
    General
  </button>
  </div>
</div>


  <ul style={{ listStyle: "none", padding: 0 }}>
    {filteredTasks.map((task, index) => (
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
  <div style={{
  fontSize: "12px",
  marginTop: "5px",
  color: "#555"
  }}>
    📂 {task.category} ⚡ {task.priority}
  </div>
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
