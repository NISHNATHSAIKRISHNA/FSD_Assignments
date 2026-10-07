import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"].map((m, i) => ({
  month: m,
  revenue: 40 + i * 6 + (i % 3) * 5,
}));

export default function RevenueChart() {
  return (
    <div style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
