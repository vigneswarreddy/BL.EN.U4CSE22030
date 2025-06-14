import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { Stock } from '../types';

interface CorrelationHeatmapProps {
  stocks: Stock[];
  correlationMatrix: number[][];
  stats: { [ticker: string]: { avg: number; std: number } };
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({
  stocks,
  correlationMatrix,
  stats,
}) => {
  const getColor = (value: number): string => {
    const intensity = Math.abs(value);
    const r = value > 0 ? 255 * intensity : 0;
    const b = value < 0 ? 255 * intensity : 0;
    return `rgb(${r}, 0, ${b})`;
  };

  return (
    <Box>
      <Box display="grid" gridTemplateColumns={`repeat(${stocks.length + 1}, 50px)`}>
        <Box />
        {stocks.map((stock) => (
          <Tooltip
            key={stock.ticker}
            title={`Avg: $${stats[stock.ticker]?.avg.toFixed(2)}, Std: $${stats[
              stock.ticker
            ]?.std.toFixed(2)}`}
          >
            <Typography align="center" variant="caption">
              {stock.ticker}
            </Typography>
          </Tooltip>
        ))}
        {stocks.map((stockI, i) => (
          <React.Fragment key={stockI.ticker}>
            <Tooltip
              title={`Avg: $${stats[stockI.ticker]?.avg.toFixed(2)}, Std: $${stats[
                stockI.ticker
              ]?.std.toFixed(2)}`}
            >
              <Typography align="right" variant="caption">
                {stockI.ticker}
              </Typography>
            </Tooltip>
            {correlationMatrix[i]?.map((value, j) => (
              <Tooltip key={`${i}-${j}`} title={`Correlation: ${value.toFixed(2)}`}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: getColor(value),
                    border: '1px solid #ccc',
                  }}
                />
              </Tooltip>
            ))}
          </React.Fragment>
        ))}
      </Box>
      <Typography variant="caption" display="block" mt={2}>
        Color Legend: Red (Positive Correlation), Blue (Negative Correlation)
      </Typography>
    </Box>
  );
};

export default CorrelationHeatmap;