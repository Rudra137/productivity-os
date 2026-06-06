import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from "recharts";

function RadarChartBox({ radarData, darkMode }) {
  return (
    <div
      style={{
  background: darkMode ? "#1e293b" : "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
      }}
    >
      <h3 
       style={{
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: darkMode ? "#f8fafc" :  "#334155"
  }}>🧭 Life Balance</h3>

<div style={{ width: "100%", height: "350px" }}>
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart
      outerRadius={100}
      data={radarData}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />

      <Radar
        name="Life Balance"
        dataKey="value"
        stroke="#3b82f6"
        fill="#3b82f6"
        fillOpacity={0.6}
      />

      <Legend />
    </RadarChart>
  </ResponsiveContainer>
</div>
    </div>
  );
}
export default RadarChartBox;