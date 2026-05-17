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

          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>

          <button
            onClick={() => {
              setEditId(task.id);
              setEditText(task.text);
            }}
          >
            Edit
          </button>

          <button onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Done"}
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItems;

