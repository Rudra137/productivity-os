function StatsCard({ title, value, darkMode }) {
  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "2px",
        background: darkMode ? "#1e293b" : "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
      }}
    >
      <h4
        style={{
          marginBottom: "6px",
          color: darkMode ? "#cbd5e1" : "#475569"
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          fontSize: "12px",
          color: darkMode ? "#f8fafc" : "#0f172a"
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;