import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";

function RadarChartBox({ radarData }) {
  return (
    <div
      style={{
  background: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  flex: 1
      }}
    >
      <h3>🧭 Life Balance</h3>

      <RadarChart
        outerRadius={120}
        width={540}
        height={450}
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
    </div>
  );
}

export default RadarChartBox;