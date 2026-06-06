

function DashboardFooter({ darkMode }) {
  return (
    <footer 
      style={{
        background: darkMode ? "#1e293b" : "#ffffff",
        padding: "20px",
        textAlign: "center",
        color: darkMode ? "#94a3b8" : "#64748b",
        fontSize: "14px",
        borderTop: "1px solid #e2e8f0"
      }}
    >
      <p>© 2023 LifeOS. All rights reserved.</p>
    </footer>
  );
}

export default DashboardFooter;