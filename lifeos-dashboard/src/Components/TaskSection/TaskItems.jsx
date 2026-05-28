import React from "react";
import TaskItem from "./TaskItems";


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
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  marginRight: "8px",
  marginTop: "10px"
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
  return (
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
  {/* TOP ROW */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    }}
  >
    <span
      style={{
        textDecoration: task.completed
          ? "line-through"
          : "none",
        fontSize: "16px",
        fontWeight: "600",
        color: "#1e293b"
      }}
    >
      {task.text}
    </span>

    <span
      style={{
        fontSize: "12px",
        padding: "6px 10px",
        borderRadius: "999px",
        background:
          task.priority === "High"
            ? "#fee2e2"
            : task.priority === "Medium"
            ? "#fef3c7"
            : "#dcfce7",
        color:
          task.priority === "High"
            ? "#dc2626"
            : task.priority === "Medium"
            ? "#d97706"
            : "#16a34a"
      }}
    >
      ⚡ {task.priority}
    </span>
  </div>

  {/* CATEGORY */}
  <div
    style={{
      fontSize: "13px",
      color: "#64748b",
      marginBottom: "12px",
      padding: "6px 10px"
    }}
  >
    📂 {task.category}
  </div>

  {/* BUTTON ROW */}
  <div>
    <button
      className="task-btn"
      style={deleteStyle}
      onClick={() => handleDelete(task.id)}
    >
      Delete
    </button>

    <button
      className="task-btn"
      style={editStyle}
      onClick={() => {
        setEditId(task.id);
        setEditText(task.text);
      }}
    >
      Edit
    </button>

    <button
      className="task-btn"
      style={doneStyle}
      onClick={() => toggleComplete(task.id)}
    >
      {task.completed ? "Undo" : "Done"}
    </button>
  </div>
</div>
      )}
    </li>
  );
}

export default TaskItems;

