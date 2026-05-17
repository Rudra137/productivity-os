import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

function RadarChartBox({ data }) {
  return (
    <RadarChart width={400} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />

      <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" />
    </RadarChart>
  );
}

export default RadarChartBox;