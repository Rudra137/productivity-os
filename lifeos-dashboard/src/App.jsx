import { useState } from "react";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
//import ProgressBar from "./Components/ProgressBar";
//import StatsCard from "./Components/StatsCard";
import TaskFilters from "./Components/TaskSection/TaskFilters";
import TaskInput from "./Components/TaskSection/TaskInput";
import WeeklyChart from "./Components/WeeklyChart";
import { getWeeklyChartData, getLifeRadarData, getTaskScore } from "./Utils/chartHelpers";
import RadarChartBox from "./Components/RadarChartBox";
import TaskItem from "./Components/TaskSection/TaskItems";



//Functional component for the main app and UseStates.
function App() {
//STATE VARIABLES  
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
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


// Helper functions to assign scores based on priority transferred to chartHelpers.js and imported here

//DERIVED DATA 

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
const chartData = getWeeklyChartData(tasks);
const radarData = getLifeRadarData(tasks);


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
  const todayScore = todaysTasks
  .filter(t => t.completed)
  .reduce((sum, t) => sum + getTaskScore(t), 0);



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


const handleDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(filteredTasks);
  const [movedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, movedItem);

  setTasks(items);
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
    
    
    
  <div
  style={{
    padding: "30px",
    maxWidth: "1400px",
    margin: "auto",
    fontFamily: "sans-serif",
    minHeight: "100vh",
    background: "#f4f7fb"
  }}
>
          <h1
  style={{
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#1e293b"
  }}
>
  LifeOS Dashboard
</h1>


{/* 🟦 WEEKLY TREND SECTION */}
<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    backgroundColor: "#e0f2fe"
  }}
>
  <WeeklyChart chartData={chartData} />
  <RadarChartBox radarData={radarData} />
</div>
    {/* 🟦 WEEKLY FOCUS SECTION */}
  <div style={{
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "#f8f9fa"
}}>
  <h3 style={{
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#334155"
  }}>📊 Weekly Focus</h3>

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
 <TaskInput
  task={task}
  setTask={setTask}
  category={category}
  setCategory={setCategory}
  priority={priority}
  setPriority={setPriority}
  addTask={addTask}
/>
  {/* ✅ FILTERS OUTSIDE UL */}
  <TaskFilters
  filter={filter}
  setFilter={setFilter}
  categoryFilter={categoryFilter}
  setCategoryFilter={setCategoryFilter}
/>

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
              <TaskItem
                task={task}
                index={index}
                editId={editId}
                editText={editText}
                setEditId={setEditId}
                setEditText={setEditText}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
                provided={provided}
              />
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
