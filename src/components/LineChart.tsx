import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  { date: '11 Apr', series1: 20, series2: 11, series3: 6, series4: 3 },
  { date: '13 Apr', series1: 15, series2: 11, series3: 4, series4: 2 },
  { date: '14 Apr', series1: 14, series2: 9, series3: 6, series4: 4 },
  { date: '15 Apr', series1: 12, series2: 10, series3: 5, series4: 3 },
  { date: '17 Apr', series1: 8, series2: 6, series3: 5, series4: 1 },
];

const CustomLineChart: React.FC = () => {
  return (
    <div className="w-full h-[300px] p-4 bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#eee" 
            vertical={false}
            horizontal={true}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#999', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#999', fontSize: 12 }}
            domain={[0, 20]}
            ticks={[0, 5, 10, 15, 20]}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#666' }}
            itemStyle={{ color: '#666' }}
          />
          <Line
            type="monotone"
            dataKey="series1"
            stroke="#8884d8"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={{ r: 3, fill: '#8884d8', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="series2"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 3, fill: '#ff7300', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="series3"
            stroke="#0088fe"
            strokeWidth={2}
            dot={{ r: 3, fill: '#0088fe', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="series4"
            stroke="#00C49F"
            strokeWidth={2}
            dot={{ r: 3, fill: '#00C49F', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart; 