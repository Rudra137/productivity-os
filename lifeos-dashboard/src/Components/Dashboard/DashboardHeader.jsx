import WeatherWidget from "./WeatherWidget";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ darkMode, userName, currentDate }) {
  const navigate = useNavigate();
  return (
    <div className="dashboard-header" style={{display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"}}> 
        {/* Left side: Greeting and quote */}
        <div className="header-left" style={{ marginBottom: "20px" }}>  
            <h1 className="greeting" style={{ fontSize: "32px", margin: 0, color: darkMode ? "#f8fafc" : "#0f172a" }}>
                Welcome back, {userName}!
            </h1>
            <h4 className="DailyQuote" style={{ fontSize: "16px", color: darkMode ? "#cbd5e1" : "#475569" }}>
                When life gives you lemons, make lemonade.
            </h4>
        </div>
        {/* Right side: Weather and date/time */}
        <div className="header-right" style={{ marginBottom: "20px", textAlign: "right", padding: "10px" }}>
            <button onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
            }} style={{ padding: "8px 16px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", marginBottom: "10px" }}>
                Logout
            </button>

            <div className="weather" style={{ color: darkMode ? "#cbd5e1" : "#475569", marginBottom: "8px" }}>
                <WeatherWidget />
            </div>
            <div className="date-time" style={{ color: darkMode ? "#cbd5e1" : "#475569" }}>
                {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} - {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    </div>
  );
}

export default DashboardHeader;