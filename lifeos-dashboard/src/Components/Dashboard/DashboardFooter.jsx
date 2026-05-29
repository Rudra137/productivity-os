function DashboardFooter(darkMode) {
  return (
    <footer darkMode={darkMode}
      style={{
        padding: "20px",
        textAlign: "center",
        color: "#64748b",
        fontSize: "14px",
        borderTop: "1px solid #e2e8f0"
      }}
    >
      <p>© 2023 LifeOS. All rights reserved.</p>
    </footer>
  );
}

export default DashboardFooter;