
import React, { useState } from "react";
//import TaskItem from "./TaskItems";


function TaskItems({
  task,
  index,
  editId,
  editText,
  setEditId,
  setEditText,
  handleEdit,
  handleDelete,
  toggleComplete,
  provided
}) {
const isEditing = editId === task.id;

const actionButton = {
  width: "32px",
  height: "32px",

  border: "none",
  borderRadius: "8px",

  cursor: "pointer",

  fontSize: "16px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "all 0.2s ease"
};

const deleteStyle = {
  ...actionButton,
  background: "#fee2e2",
  color: "#dc2626"
};

const editStyle = {
  ...actionButton,
  background: "#dbeafe",
  color: "#2563eb"
};

const doneStyle = {
  ...actionButton,
  background: task.completed ? "#e2e8f0" : "#dcfce7",
  color: task.completed ? "#475569" : "#16a34a"
};

const [showDetails, setShowDetails] = useState(false);

const priorityColor = 
  task.priority === "High"
    ? "#ffb5b5"
    : task.priority === "Medium"
    ? "#ffd285"
    : task.priority === "Low"
    ? "#9effc2"
    : "#a8e5ff"; // General

const priorityStyles = {
  High: {
    background: "#fef2f2",
    borderLeft: "5px solid #ef4444"
  },

  Medium: {
    background: "#fffbeb",
    borderLeft: "5px solid #f59e0b"
  },

  Low: {
    background: "#f0fdf4",
    borderLeft: "5px solid #22c55e"
  },

  General: {
    background: "#f0f9ff",
    borderLeft: "5px solid #38bdf8"
  }
};

const currentPriorityStyle =
  priorityStyles[task.priority] ||
  priorityStyles.General;

  return (
<li
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
 style={{
  marginBottom: "10px",
  padding: "14px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",

  ...currentPriorityStyle,

  ...provided.draggableProps.style
}}
>
      {isEditing ? (
        <div>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button 
            onClick={() => {
              handleEdit(task.id, editText);
              setEditId(null);
              setEditText("");
            }}
          >
            Save
          </button>

          <button onClick={() => setEditId(null)}>
            Cancel
          </button>
        </div>
      ) : (
<div>
  {/* Row 1 */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  }}
>
  <span
    style={{
      fontSize: "16px",
      fontWeight: "600",
      textDecoration: task.completed
        ? "line-through"
        : "none"
    }}
  >
    {task.text}
  </span>

  <button
    onClick={() => setShowDetails(!showDetails)}
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "18px"
    }}
  >
    ℹ️
  </button>
</div>
{showDetails && (
  <div
    style={{
      background: "rgba(255,255,255,0.5)",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "10px",
      fontSize: "13px"
    }}
  >
    <div style={{ marginBottom: "6px" }}>
      <strong>Description:</strong>
      <br />
      {task.description || "No description"}
    </div>

    <div style={{ marginBottom: "6px" }}>
      <strong>Duration:</strong>
      {" "}
      {task.durationMinutes || 0} min
    </div>

    <div>
      <strong>Date:</strong>
      {" "}
      {task.date || "Not set"}
    </div>
  </div>
)}

  {/* Row 2 */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <span
      style={{
        fontSize: "13px",
        color: "#64748b"
      }}
    >
      📂 {task.category}
    </span>

    <div
      style={{
        display: "flex",
        gap: "8px"
      }}
    >
      <button
        style={editStyle} onClick={() => {setEditId(task.id); setEditText(task.text);}}>
          ✏️
      </button>

      <button style={doneStyle} onClick={() => toggleComplete(task.id)}>
        {task.completed ? "↩️" : "✔️"}
      </button>

      <button style={deleteStyle} onClick={() => handleDelete(task.id)}>
        🗑
      </button>
    </div>
  </div>
</div>
      )}
    </li>
  );
}

export default TaskItems;

