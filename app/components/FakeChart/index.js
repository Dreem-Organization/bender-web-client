import React from 'react';
import {
  ComposedChart,
  ResponsiveContainer,
  Area,
  YAxis,
  XAxis,
  Bar,
  Line,
} from 'recharts';

const data = [
  { name: 'Page A', uv: 590, pv: 0, amt: 0 },
  { name: 'Page B', uv: 868, pv: 300, amt: 800 },
  { name: 'Page C', uv: 1397, pv: 898, amt: 989 },
  { name: 'Page D', uv: 1480, pv: 1300, amt: 1228 },
  { name: 'Page E', uv: 1520, pv: 1008, amt: 1100 },
  { name: 'Page F', uv: 1800, pv: 680, amt: 1700 },
];

function FakeChart() {
  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <XAxis axisLine={false} tick={false} />
        <YAxis axisLine={false} tick={false} />
        <Area type="monotone" dataKey="amt" fill="#fff" stroke="#fff" />
        <Bar dataKey="pv" barSize={20} fill="#fff" />
        <Line type="monotone" dataKey="uv" stroke="#fff" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
export default FakeChart;
