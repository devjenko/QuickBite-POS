"use client";

import { ChartDataPoint } from '@/lib/chartUtils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


type SimpleAreaChartProps = {
  data: ChartDataPoint[];
}

const SimpleAreaChart = ({data}: SimpleAreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: -12,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip  />
        <Area type="monotone" dataKey="Revenue" stroke="var(--DarkBlue)" fill="var(--Blue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SimpleAreaChart;