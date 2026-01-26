"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Mon',
    Revenue: 2400,  
  },
  {
    name: 'Tue',
    Revenue: 3000,
  },
  {
    name: 'Wed',
    Revenue: 2000,
  },
  { 
    name: 'Thu',
    Revenue: 2780,
  },
  {
    name: 'Fri',
    Revenue: 2780,
  },
  {
    name: 'Sat',
    Revenue: 2780,
  },
  {
    name: 'Sun',
    Revenue: 2780,
  },

];

// #endregion
const SimpleAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: -10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Revenue" stroke="var(--DarkBlue)" fill="var(--Blue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SimpleAreaChart;