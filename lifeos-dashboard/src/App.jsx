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
import StatsCard from "./Components/Dashboard/StatsCard";
import StatsSection from "./Components/Dashboard/StatsSection";
import DashboardHeader from "./Components/Dashboard/DashboardHeader";



//Functional component for the main app and UseStates.
function App() {
//STATE VARIABLES  
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
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

const handleDelete = (id) => {
  setTasks((prev) =>
    prev.filter((task) => task.id !== id)
  );
};

const handleEdit = (id, newText) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? { ...task, text: newText }
        : task
    )
  );
};

const toggleComplete = (id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

const handleDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(filteredTasks);

  const [movedItem] = items.splice(
    result.source.index,
    1
  );

  items.splice(
    result.destination.index,
    0,
    movedItem
  );

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
    transition: "all 0.3s ease",
    padding: "30px",
    width: "100%",
    minHeight: "100vh",
    margin: "auto",
    fontFamily: "sans-serif",
    background: darkMode ? "#0f172a" : "#f4f7fb",
  }}
>
  <DashboardHeader
   darkMode={darkMode}
   userName="Debojyoti"
   currentDate={new Date()}
  />

   <h1
  style={{
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "30px",
    color: darkMode ? "#f8fafc" : "#1e293b",
  }}
>
  LifeOS Dashboard
</h1>
<button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    marginBottom: "20px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: darkMode ? "#f8fafc" : "#1e293b",
    color: darkMode ? "#1e293b" : "#f8fafc",
    fontWeight: "600"
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>


{/* 🟦 UPPER DASHBOARD SECTION */}
{/* 🟦 WEEKLY TREND SECTION */}
<div
    style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "20px"
  }}
>
  <WeeklyChart
    chartData={chartData}
    darkMode={darkMode}
  />

  <RadarChartBox
    radarData={radarData}
    darkMode={darkMode}
  />
</div>


{/* LOWER DASHBOARD SECTION */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  }}
>

  {/* TASK LIST CARD */}
  <div
    style={{
      padding: "20px",
      borderRadius: "16px",
      background: darkMode ? "#1e293b" : "#ffffff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h3>Your Tasks</h3>

    <TaskFilters
      filter={filter}
      setFilter={setFilter}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
    />

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              listStyle: "none",
              padding: 0
            }}
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

  {/* STATS CARDS */}
  <div>
    <StatsSection
      total={totalTasks}
      completed={completedTasks}
      pending={pendingTasks}
      streak={streak}
      darkMode={darkMode}
    />
  </div>

  {/* ADD TASK CARD */}
  <div
    style={{
      padding: "20px",
      borderRadius: "16px",
      background: darkMode ? "#1e293b" : "#ffffff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h3>Add Task</h3>

    <TaskInput
      task={task}
      setTask={setTask}
      category={category}
      setCategory={setCategory}
      priority={priority}
      setPriority={setPriority}
      addTask={addTask}
    />
  </div>


</div>
</div>
);
}




export default App;
