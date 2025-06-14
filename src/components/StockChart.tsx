
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { StockPriceHistory } from '../types';

Chart.register(...registerables);

interface StockChartProps {
  priceHistory: StockPriceHistory;
}

const StockChart: React.FC<StockChartProps> = ({ priceHistory }) => {
  const prices = priceHistory.map((entry) => entry.price);
  const labels = priceHistory.map((entry) => new Date(entry.lastUpdatedAt).toLocaleTimeString());
  const average = prices.length > 0 ? prices.reduce((sum, p) => sum + p, 0) / prices.length : 0;

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Average Price',
        data: Array(prices.length).fill(average),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Price: $${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Price ($)' } },
    },
  };

  return <Line data={data} options={options} />;
};

export default StockChart;