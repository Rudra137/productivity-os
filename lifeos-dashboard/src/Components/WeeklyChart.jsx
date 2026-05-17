import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function WeeklyChart({ chartData }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>📈 Weekly Trend</h3>

      <AreaChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorWork" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>

          <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>

          <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />
        <YAxis />

        <Tooltip />
        <Legend />

        <Area
          type="monotone"
          dataKey="Work"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorWork)"
          strokeWidth={3}
        />

        <Area
          type="monotone"
          dataKey="Health"
          stroke="#22c55e"
          fillOpacity={1}
          fill="url(#colorHealth)"
          strokeWidth={3}
        />

        <Area
          type="monotone"
          dataKey="Study"
          stroke="#f97316"
          fillOpacity={1}
          fill="url(#colorStudy)"
          strokeWidth={3}
        />
      </AreaChart>
    </div>
  );
}

export default WeeklyChart;