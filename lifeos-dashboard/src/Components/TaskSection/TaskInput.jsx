import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [taskData, setTaskData] = useState({
    taskName: "",
    category: "General",
    priority: "Medium",
    description: "",
    timeValue: "", // The number input field
    timeUnit: "hours" // Default to hours
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!taskData.taskName.trim()) return;

    // Convert everything to single base unit (minutes) for simple arithmetic tracking
    const rawTime = parseFloat(taskData.timeValue) || 0;
    const totalMinutes = taskData.timeUnit === "hours" ? rawTime * 60 : rawTime;

    addTask({
      ...taskData,
      durationMinutes: totalMinutes // Pass calculated minutes up to App.jsx
    });

    setTaskData({
      taskName: "",
      category: "General",
      priority: "Medium",
      description: "",
      timeValue: "",
      timeUnit: "hours"
    });
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      width: "100%",
      maxWidth: "420px",
      padding: "24px",
      border: "1px solid #eef2f6",
      boxSizing: "border-box",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ 
        color: "#1e3a5f",
        fontSize: "1.35rem",
        fontWeight: "700",
        marginBottom: "20px",
        paddingBottom: "12px",
        borderBottom: "1px solid #e2e8f0"
      }}>
        Add New Task
      </h3>

      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* TASK NAME */}
        <div>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={taskData.taskName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.95rem",
              color: "#334155",
              boxSizing: "border-box",
              outline: "none"
            }}
          />
        </div>

        {/* CATEGORY */}
        <div>
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.95rem",
              color: "#334155",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
              outline: "none"
            }}
          >
            <option>General</option>
            <option>Work</option>
            <option>Study</option>
            <option>Health</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "12px 10px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.95rem",
              color: "#334155",
              boxSizing: "border-box",
              outline: "none",
              resize: "vertical"
            }}
          />
        </div>

        {/* PRIORITY BOTTOM ROW */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "10px",
          marginTop: "4px"
        }}>
          <span style={{ color: "#1e3a5f", fontWeight: "600", fontSize: "1rem" }}>
            Priority
          </span>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            style={{
              width: "120px",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "0.95rem",
              color: "#334155",
              backgroundColor: "#ffffff",
              outline: "none"
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* TIME ESTIMATE MIXED SPLIT ROW */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px"
        }}>
          <span style={{ color: "#1e3a5f", fontWeight: "600", fontSize: "1rem" }}>
             Estimated Time
          </span>
          <div style={{ display: "flex", gap: "8px", width: "200px" }}>
            <input
              type="number"
              name="timeValue"
              placeholder="0"
              min="0"
              step="any"
              value={taskData.timeValue}
              onChange={handleChange}
              required
              style={{
                width: "40%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "0.95rem",
                color: "#334155",
                outline: "none",
                textAlign: "center"
              }}
            />
            <select
              name="timeUnit"
              value={taskData.timeUnit}
              onChange={handleChange}
              style={{
                width: "60%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "0.95rem",
                color: "#334155",
                backgroundColor: "#ffffff",
                outline: "none"
              }}
            >
              <option value="minutes">Mins</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            backgroundColor: "#1cb07e",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "14px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "8px",
            width: "100%"
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskInput;