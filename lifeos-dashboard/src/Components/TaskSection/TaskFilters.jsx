import React from "react";

function TaskFilters({ filter, setFilter, categoryFilter, setCategoryFilter }) {
  return (
    // 💡 Added display: "flex" and gap to align them horizontally on the same line
    <div className="filter-row" style={{ display: "flex", gap: "12px", marginBottom: "15px" }}>
      
      {/* ✅ STATUS DROPDOWN */}
      <div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={dropdownStyle}
        >
          <option value="All">Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      
      {/* 📂 CATEGORY DROPDOWN */}
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={dropdownStyle}
        >
          {["All", "Work", "Study", "Health", "General", "Relationships", "Creativity", "Finance"].map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

// 🎨 Styles
const dropdownStyle = {
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  color: "#334155",
  cursor: "pointer",
  outline: "none",
  minWidth: "140px" // Ensures both dropdowns have a consistent, clean width
};

export default TaskFilters;