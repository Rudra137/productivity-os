import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; //

import TaskFilters from "../Components/TaskSection/TaskFilters";
import TaskInput from "../Components/TaskSection/TaskInput";
import WeeklyChart from "../Components/WeeklyChart";
import RadarChartBox from "../Components/RadarChartBox";
import TaskItem from "../Components/TaskSection/TaskItems";
import StatsSection from "../Components/Dashboard/StatsSection";
import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import DashboardFooter from "../Components/Dashboard/DashboardFooter";

import {
  getWeeklyChartData,
  getLifeRadarData,
  getTaskScore,
} from "../Utils/chartHelpers";

import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  // AUTH STATE
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // TASK/UI STATE
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // THEME
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // STREAK
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [lastCheckedDate, setLastCheckedDate] = useState(() => {
    return localStorage.getItem("lastCheckedDate") || null;
  });

  const today = new Date().toLocaleDateString();

  // AUTH EFFECT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // LOAD TASKS
  // For now this still loads from localStorage.
  // If you want, next step is moving tasks fully into Firestore.
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // SAVE TASKS
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // SAVE STREAK
  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  // SAVE LAST CHECK DATE
  useEffect(() => {
    if (lastCheckedDate) {
      localStorage.setItem("lastCheckedDate", lastCheckedDate);
    }
  }, [lastCheckedDate]);

  // DERIVED TASK DATA
  const todaysTasks = useMemo(() => {
    return tasks.filter((task) => task.date === today);
  }, [tasks, today]);

  const filteredTasks = useMemo(() => {
    return todaysTasks.filter((task) => {
      if (filter === "Completed" && !task.completed) return false;
      if (filter === "Pending" && task.completed) return false;
      if (categoryFilter !== "All" && task.category !== categoryFilter) return false;

      if (
        searchTerm &&
        !(
          task.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  }, [todaysTasks, filter, categoryFilter, searchTerm]);

  const chartData = useMemo(() => getWeeklyChartData(tasks), [tasks]);
  const radarData = useMemo(() => getLifeRadarData(tasks), [tasks]);

  // STATS
  const total = todaysTasks.length;
  const completed = todaysTasks.filter((task) => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const weeklyData = {
    Work: tasks.filter((task) => task.category === "Work" && task.completed).length,
    Health: tasks.filter((task) => task.category === "Health" && task.completed).length,
    Study: tasks.filter((task) => task.category === "Study" && task.completed).length,
  };

  const totalMinutesAllocated = todaysTasks.reduce(
    (sum, task) => sum + (task.durationMinutes || 0),
    0
  );

  const totalMinutesCompleted = todaysTasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + (task.durationMinutes || 0), 0);

  const todayScore = todaysTasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + getTaskScore(task), 0);

  const maxValue = Math.max(...Object.values(weeklyData), 1);

  const formatTime = (totalMins) => {
    if (totalMins < 60) return `${totalMins}m`;
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  };

  // STREAK CHECK
  useEffect(() => {
    const todayStr = new Date().toLocaleDateString();

    if (lastCheckedDate === todayStr) return;
    if (total === 0) return;

    if (percent >= 70) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setLastCheckedDate(todayStr);
  }, [total, percent, lastCheckedDate]);

  // ACTIONS
  const addTask = (newTaskData) => {
    const finalTask = {
      id: Date.now().toString(),
      title: newTaskData.taskName,
      text: newTaskData.taskName,
      category: newTaskData.category,
      priority: newTaskData.priority,
      description: newTaskData.description,
      durationMinutes: Number(newTaskData.durationMinutes) || 0,
      date: new Date().toLocaleDateString(),
      completed: false,
    };

    setTasks((prev) => [...prev, finalTask]);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText, title: newText } : task
      )
    );
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedFiltered = Array.from(filteredTasks);
    const [movedItem] = reorderedFiltered.splice(sourceIndex, 1);
    reorderedFiltered.splice(destinationIndex, 0, movedItem);

    const reorderedFilteredIds = reorderedFiltered.map((task) => task.id);
    const untouchedTasks = tasks.filter(
      (task) => !filteredTasks.some((filteredTask) => filteredTask.id === task.id)
    );

    const reorderedFullTasks = [
      ...untouchedTasks,
      ...reorderedFiltered,
    ];

    setTasks(reorderedFullTasks);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div
        className="page-container"
        style={{
          background: darkMode ? "#0f172a" : "#f8fafc",
          minHeight: "100vh",
          color: darkMode ? "#f8fafc" : "#1e293b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div
      className="page-container"
      style={{
        background: darkMode ? "#0f172a" : "#f8fafc",
      }}
    >
      <DashboardHeader
        className="dashboard-header"
        darkMode={darkMode}
        userName={currentUser?.displayName || currentUser?.email || "User"}
        currentDate={new Date()}
        onLogout={handleLogout}
      />

      <h1
        className="dashboard-title"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: darkMode ? "#f8fafc" : "#1e293b",
        }}
      >
        LifeOS Dashboard
      </h1>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{
          maxWidth: "160px",
          alignSelf: "center",
          justifySelf: "center",
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: darkMode ? "#f8fafc" : "#1e293b",
          color: darkMode ? "#1e293b" : "#f8fafc",
          fontWeight: "600",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="upper-dashboard">
        <WeeklyChart chartData={chartData} darkMode={darkMode} />
        <RadarChartBox radarData={radarData} darkMode={darkMode} />
      </div>

      <div className="lower-dashboard">
        <div
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: darkMode ? "#1e293b" : "#ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            marginBottom: "10px",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
              color: darkMode ? "#f8fafc" : "#475569",
            }}
          >
            Your Tasks
          </h3>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "95%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
              }}
            />
          </div>

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

        <div>
          <StatsSection
            total={totalTasks}
            completed={completedTasks}
            pending={pendingTasks}
            streak={streak}
            darkMode={darkMode}
            totalTimeAllocated={formatTime(totalMinutesAllocated)}
            totalTimeSpent={formatTime(totalMinutesCompleted)}
            todayScore={todayScore}
            maxValue={maxValue}
          />
        </div>

        <div
          style={{
            padding: "10px",
            borderRadius: "16px",
            background: darkMode ? "#1e293b" : "#ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <TaskInput addTask={addTask} />
        </div>
      </div>

      <div>
        <DashboardFooter darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Dashboard;
