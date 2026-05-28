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
  marginRight: "8px",
  padding: "10px 10px 10px 10px",
  borderRadius: "10px",
  border: "none",
  background: "#e2e8f0",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  color: "#334155",
  transition: "0.2s"
};

const activeStyle = {
  ...buttonStyle,
  background: "#3b82f6",
  color: "white"
};

export default TaskFilters;

