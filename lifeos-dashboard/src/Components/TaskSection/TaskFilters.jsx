import React from "react";

function TaskFilters({ filter, setFilter, categoryFilter, setCategoryFilter }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      
      {/* ✅ STATUS FILTERS */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setFilter("All")}
          style={filter === "All" ? activeStyle : buttonStyle}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Completed")}
          style={filter === "Completed" ? activeStyle : buttonStyle}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("Pending")}
          style={filter === "Pending" ? activeStyle : buttonStyle}
        >
          Pending
        </button>
      </div>

      {/* 📂 CATEGORY FILTERS */}
      <div>
        <span style={{ marginRight: "8px" }}>Category:</span>

        {["All", "Work", "Study", "Health", "General"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={categoryFilter === cat ? activeStyle : buttonStyle}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// 🎨 Styles
const buttonStyle = {
  marginRight: "5px",
  padding: "5px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer"
};

const activeStyle = {
  ...buttonStyle,
  background: "#fcfa93",
  fontWeight: "bold"
};

export default TaskFilters;

