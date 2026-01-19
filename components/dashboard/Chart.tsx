"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 300,
    pv: 1398,
    amt: 2400,
  },
  {
    name: "Page D",
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: "Page E",
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: "Page F",
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};

const formatAxisTick = (value: string): string => {
  return `*${value}*`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomBarLabel = (props: any) => {
  const { x = 0, y = 0, width = 0, value = 0 } = props;
  return (
    <text x={Number(x) + Number(width) / 2} y={Number(y)} fill="#666" textAnchor="middle" dy={-6}>
      {`value: ${value}`}
    </text>
  );
};

export default function Chart() {
  return (
    <BarChart width={600} height={300} data={data} margin={margin}>
      <XAxis
        dataKey="name"
        tickFormatter={formatAxisTick}
        label={{ position: "insideBottomRight", value: "XAxis title", offset: -10 }}
      />
      <YAxis label={{ position: "insideTopLeft", value: "YAxis title", angle: -90, dy: 60 }} />
      <Bar dataKey="uv" fill="#8884d8" label={renderCustomBarLabel} />
    </BarChart>
  );
}
