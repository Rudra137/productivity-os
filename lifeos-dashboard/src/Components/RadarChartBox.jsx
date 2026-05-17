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
        backgroundColor: "#fefff7",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px"
      }}
    >
      <h3>🧭 Life Balance</h3>

      <RadarChart
        outerRadius={120}
        width={540}
        height={400}
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