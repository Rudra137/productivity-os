function TaskInput({
  task,
  setTask,
  category,
  setCategory,
  priority,
  setPriority,
  addTask
}) {
  return (
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
        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            marginRight: "5px",
            marginTop: "10px",
            padding: "10px",
            borderRadius: "10px"
          }}
        >
          <option>General</option>
          <option>Work</option>
          <option>Study</option>
          <option>Health</option>
        </select>

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            marginRight: "5px",
            marginTop: "10px",
            padding: "10px",
            borderRadius: "10px"
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={addTask}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#4CAF50",
            color: "white"
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskInput;