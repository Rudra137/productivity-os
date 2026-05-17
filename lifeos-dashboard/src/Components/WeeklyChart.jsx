import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

function WeeklyChart({ data }) {
  return (
    <AreaChart width={650} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />

      <Area dataKey="Work" stroke="#3b82f6" />
      <Area dataKey="Health" stroke="#22c55e" />
      <Area dataKey="Study" stroke="#f97316" />
    </AreaChart>
  );
}

export default WeeklyChart;