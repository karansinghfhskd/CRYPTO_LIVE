import React from 'react';

interface PriceChangeCellProps {
  value: number;
}

/**
 * Component for displaying price changes with color coding
 */
const PriceChangeCell: React.FC<PriceChangeCellProps> = ({ value }) => {
  // Determine color based on positive or negative value
  const color = value < 0 ? 'red' : value > 0 ? 'green' : '';
  
  // Format the value with a sign and 2 decimal places
  const formattedValue = `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  
  return (
    <div className={`price-change ${color}`}>
      {formattedValue}
    </div>
  );
};

export default PriceChangeCell; 