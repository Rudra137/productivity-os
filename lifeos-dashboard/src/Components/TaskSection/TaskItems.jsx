import React from "react";


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
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.text}
          </span>

          <div style={{ fontSize: "12px" }}>
            📂 {task.category} ⚡ {task.priority}
          </div>
<button
  style={deleteStyle}
  onClick={() => handleDelete(task.id)}
>
  Delete
</button>

<button
  style={editStyle}
  onClick={() => {
    setEditId(task.id);
    setEditText(task.text);
  }}
>
  Edit
</button>

<button
  style={doneStyle}
  onClick={() => toggleComplete(task.id)}
>
  {task.completed ? "Undo" : "Done"}
</button>
        </div>
      )}
    </li>
  );
}

export default TaskItems;

