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
      style={{ height: "400px", width: "100%",
        display: "grid",
        gridTemplateRows: "repeat(7, 1fr)",

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

      <StatsCard
        title="Today's Score"
        value={Math.round((completedTasks / totalTasks) * 100)}
        darkMode={darkMode}
      />
    </div>
  );
}

export default StatsSection;