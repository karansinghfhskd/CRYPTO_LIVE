import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
  color?: string;
  logoUrl?: string;
}

/**
 * Simple chart component for displaying price trends
 */
const MiniChart: React.FC<MiniChartProps> = ({ data, color = '#8884d8', logoUrl }) => {
  // Transform the raw data into a format Recharts can use
  const chartData = useMemo(() => {
    return data.map(value => ({
      value
    }));
  }, [data]);
  
  
  // Determine if the trend is positive or negative
  const trend = data[data.length - 1] > data[0] ? 'up' : 'down';
  const chartColor = color || (trend === 'up' ? '#16c784' : '#ea3943');
  
  return (
    <div className="mini-chart">
      {logoUrl && (
        <div className="mini-chart-logo-container">
          <img src={logoUrl} alt="Crypto Logo" className="mini-chart-logo" />
        </div>
      )}
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={chartColor} 
            strokeWidth={1.5} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart; 