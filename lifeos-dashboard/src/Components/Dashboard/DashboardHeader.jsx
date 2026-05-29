function DashboardHeader({ darkMode, userName, currentDate }) {
  return (
    <div className="dashboard-container" style={{display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"}}> 
        <div className="header-left" style={{ marginBottom: "20px" }}>  
            <h1 className="Greeting" style={{ fontSize: "32px", margin: 0, color: darkMode ? "#f8fafc" : "#0f172a" }}>
                Welcome back, {userName}!
            </h1>
            <h4 className="DailyQuote" style={{ fontSize: "16px", color: darkMode ? "#cbd5e1" : "#475569" }}>
                When life gives you lemons, make lemonade.
            </h4>
        </div>
        <div className="header-right" style={{ marginBottom: "20px" }}>
            <div className="weather" style={{ color: darkMode ? "#cbd5e1" : "#475569", marginBottom: "8px" }}>
                🌤️ 72°F, Sunny
            </div>
            <div className="date-time" style={{ color: darkMode ? "#cbd5e1" : "#475569" }}>
                {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} - {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    </div>
  );
}

export default DashboardHeader;