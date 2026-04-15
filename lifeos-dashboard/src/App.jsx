import { useState } from "react";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";




//Functional component for the main app and UseStates.
function App() {
//STATE VARIABLES  
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
  

//DERIVED DATA 

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
// 📅 Today
const today = new Date().toLocaleDateString();

// 📊 Today's tasks
const todaysTasks = tasks.filter(t => t.date === today);

// 🎯 Filtered tasks
const filteredTasks = todaysTasks.filter((task) => {
  if (filter === "Completed" && !task.completed) return false;
  if (filter === "Pending" && task.completed) return false;
  if (categoryFilter !== "All" && task.category !== categoryFilter) return false;
  return true;
});


// 📊 Weekly data (FIXED POSITION)
const getWeeklyTrend = () => {
  const result = {
    Work: Array(7).fill(0),
    Health: Array(7).fill(0),
    Study: Array(7).fill(0)
  };

  tasks.forEach(task => {
    if (!task.completed) return;

    const date = new Date(task.date);
    const dayIndex = date.getDay(); // 0-6

    if (result[task.category]) {
      result[task.category][dayIndex]++;
    }
  });

  return result;
};

const getTaskScore = (task) => {
  if (task.priority === "High") return 3;
  if (task.priority === "Medium") return 2;
  return 1; // Low
};

// 📊 Weekly chart data (FIXED POSITION)
const getWeeklyChartData = () => {
  const now = new Date();

  return [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - i);

    const dateStr = d.toLocaleDateString();
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

    const dayTasks = tasks.filter(t => t.date === dateStr && t.completed);

    return {
      day: dayName,

      Work: dayTasks
        .filter(t => t.category === "Work")
        .reduce((sum, t) => sum + getTaskScore(t), 0),

      Health: dayTasks
        .filter(t => t.category === "Health")
        .reduce((sum, t) => sum + getTaskScore(t), 0),

      Study: dayTasks
        .filter(t => t.category === "Study")
        .reduce((sum, t) => sum + getTaskScore(t), 0),
    };
  }).reverse();
};


const chartData = getWeeklyChartData();

const weeklyTrend = getWeeklyTrend();


// Calculate today's stats
const total = todaysTasks.length;
const completed = todaysTasks.filter(t => t.completed).length;
const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

// Calculate stats for the dashboard
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const weeklyData = {
    Work: tasks.filter(t => t.category === "Work" && t.completed).length,
    Health: tasks.filter(t => t.category === "Health" && t.completed).length,
    Study: tasks.filter(t => t.category === "Study" && t.completed).length
  };
  const maxValue = Math.max(...Object.values(weeklyData), 1); 
  const maxDayValue = Math.max(...weeklyTrend.Work, ...weeklyTrend.Health, ...weeklyTrend.Study, 1);

//FUNCTIONS
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
const handleDelete = (id) => {
  setTasks((prev) => prev.filter(task => task.id !== id));
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

// Handle drag-and-drop reordering
const handleDragEnd = (result) => {
  // If dropped outside list → do nothing
  if (!result.destination) return;

  // Step 1: Reorder visible tasks
  const items = Array.from(filteredTasks);
  const [movedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, movedItem);

  // Step 2: Update main tasks state (THIS is your code)
  setTasks((prev) => {
    const newTasks = [...prev];

    items.forEach((item, index) => {
      const originalIndex = newTasks.findIndex(t => t.id === item.id);
      newTasks.splice(originalIndex, 1);
      newTasks.splice(index, 0, item);
    });

    return newTasks;
  });
};
  


// 🧠 EFFECTS
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






console.log("TASKS:", tasks);


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

    {/* CATEGORY SELECTOR */}
  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
    marginRight: "5px",
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #aaa",
    borderRadius: "10px"
  }}
  >
  
  <h5>Category</h5>
  <option>General</option>
  <option>Work</option>
  <option>Study</option>
  <option>Health</option>
</select>


{/* PRIORITY SELECTOR */}
<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  style={{ 
    marginRight: "5px",marginTop: "10px", padding: "10px", border: "1px solid #aaa", borderRadius: "10px" }}
>
  <h5>Priority</h5>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
  
</select>

{/* ADD TASK BUTTON */}
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


{/* 🟦 WEEKLY TREND SECTION */}

<AreaChart
  width={650}
  height={300}
  data={chartData}
  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
>
  <defs>
    <linearGradient id="colorWork" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
    </linearGradient>

    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
    </linearGradient>

    <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
    </linearGradient>
  </defs>

  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="day" />
  <YAxis />

  <Tooltip />
  <Legend />

  <Area
    type="monotone"
    dataKey="Work"
    stroke="#3b82f6"
    fillOpacity={1}
    fill="url(#colorWork)"
    strokeWidth={3}
  />

  <Area
    type="monotone"
    dataKey="Health"
    stroke="#22c55e"
    fillOpacity={1}
    fill="url(#colorHealth)"
    strokeWidth={3}
  />

  <Area
    type="monotone"
    dataKey="Study"
    stroke="#f97316"
    fillOpacity={1}
    fill="url(#colorStudy)"
    strokeWidth={3}
  />

</AreaChart>


    {/* 🟦 WEEKLY FOCUS SECTION */}
  <div style={{
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "#f8f9fa"
}}>
  <h3>📊 Weekly Focus</h3>

  {["Health", "Work", "Study"].map((cat) => (
    <div key={cat} style={{ marginBottom: "10px" }}>
      <div style={{ fontSize: "14px", marginBottom: "3px" }}>
        {cat} ({weeklyData[cat]})
      </div>

      <div style={{
        height: "15px",
        background: "#ddd",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${(weeklyData[cat] / maxValue) * 100}%`,
          height: "100%",
          background:
            cat === "Health"
              ? "#4CAF50"
              : cat === "Work"
              ? "#2196F3"
              : "#FF9800",
          transition: "0.3s"
        }} />
      </div>
    </div>
  ))}
</div>

  {/* 🟩 TASK LIST SECTION */}
<div style={{
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "10px",
}}>

  <h3 style={{ marginBottom: "10px" }}>Your Tasks</h3>

  {/* ✅ FILTERS OUTSIDE UL */}
  <div style={{ marginBottom: "10px" }}>
    <button onClick={() => setFilter("All")}
      style={filter === "All" ? { background: "#fcfa93" } : {}}>
      All
    </button>

    <button onClick={() => setFilter("Completed")}
      style={filter === "Completed" ? { background: "#fcfa93" } : {}}>
      Completed
    </button>

    <button onClick={() => setFilter("Pending")}
      style={filter === "Pending" ? { background: "#fcfa93" } : {}}>
      Pending
    </button>
  </div>

  <div style={{ marginBottom: "10px" }}>
    Category:
    <button onClick={() => setCategoryFilter("Work")}>Work</button>
    <button onClick={() => setCategoryFilter("Study")}>Study</button>
    <button onClick={() => setCategoryFilter("Health")}>Health</button>
    <button onClick={() => setCategoryFilter("General")}>General</button>
  </div>

  {/* DRAG AND DROP CONTEXT */}
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ listStyle: "none", padding: 0 }}
        >

          {filteredTasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    marginBottom: "10px",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    ...provided.draggableProps.style
                  }}
                >

                  {editIndex === index ? (
                    <div>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={() => {
                        handleEdit(index, editText);
                        setEditIndex(null);
                        setEditText("");
                      }}>Save</button>
                      <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <span style={{
                        textDecoration: task.completed ? "line-through" : "none"
                      }}>
                        {task.text}
                      </span>

                      <div style={{ fontSize: "12px" }}>
                        📂 {task.category} ⚡ {task.priority}
                      </div>

                      <button onClick={() => handleDelete(task.id)}>Delete</button>
                      <button onClick={() => {
                        setEditIndex(index);
                        setEditText(task.text);
                      }}>Edit</button>
                      <button onClick={() => toggleComplete(task.id)}>
                        {task.completed ? "Undo" : "Done"}
                      </button>
                    </div>
                  )}

                </li>
              )}
            </Draggable>
          ))}

          {provided.placeholder}

        </ul>
      )}
    </Droppable>
  </DragDropContext>

</div>
</div>
);
};


export default App;
