function StatsCard({ title, value, darkMode }) {
  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "20px",
        background: darkMode ? "#1e293b" : "#ffffff",
        boxShadow: "0 4px 5px rgba(0,0,0,0.08)"
      }}
    >
      <h3
        style={{
          marginBottom: "1px",
          fontSize: "13px",
          marginTop: "1px",
          color: darkMode ? "#f8fcc4" : "#29174e"
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          fontSize: "15px",
          color: darkMode ? "#f8fafc" : "#0f172a"
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;