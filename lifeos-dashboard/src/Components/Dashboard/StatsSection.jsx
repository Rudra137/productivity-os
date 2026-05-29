import React from "react";
import StatsCard from "./StatsCard";

function StatsSection({
  totalTasks,
  completedTasks,
  pendingTasks,
  streak,
  darkMode
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(4, 1fr)",

        gap: "5px",
        marginBottom: "10px"
      }}
    >
      <StatsCard
        title="Total Tasks"
        value={totalTasks}
        darkMode={darkMode}
      />

      <StatsCard
        title="Completed"
        value={completedTasks}
        darkMode={darkMode}
      />

      <StatsCard
        title="Pending"
        value={pendingTasks}
        darkMode={darkMode}
      />

      <StatsCard
        title="Streak"
        value={`${streak} Days`}
        darkMode={darkMode}
      />
    </div>
  );
}

export default StatsSection;