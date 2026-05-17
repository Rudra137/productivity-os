  const todayScore = todaysTasks
  .filter(t => t.completed)
  .reduce((sum, t) => sum + getTaskScore(t), 0);
{/* 🟩 PROGRESS BAR SECTION */}
    <div style={{
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "12px",
  background: "#f0f0f0"
}}>
  <h3>📊 Daily Progress</h3>
  <p>⚡ Productivity Score Today: {todayScore}</p>
  
  <div style={{
    height: "20px",
    background: "#ddd",
    borderRadius: "10px",
    overflow: "hidden"
  }}>
    <div style={{
      width: `${percent}%`,
      height: "100%",
      background: percent === 100 ? "green" : percent > 50 ? "orange" : "red",
      transition: "0.3s"
      
    }}>
      
    </div>
  </div>

  <p style={{ marginTop: "8px" }}>
    {completed} / {total} tasks completed ({percent}%)
  </p>

    <div>
    <div style={{
  marginTop: "10px",    
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "10px",
  background: "#fff3cd"
}}>
  <h3>🔥 Streak: {streak} days</h3>
  <p>
    Today: {Math.round(percent)}% completed
  </p>
  </div>
  </div>
</div>

export default ProgressBar;
