import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import StockChart from '../components/StockChart';
import StockSelector from '../components/StockSelector';
import { getStocks, getStockPrice } from '../services/api';
import { Stock, StockPriceHistory } from '../types';

const StockPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [minutes, setMinutes] = useState<number>(10);
  const [priceHistory, setPriceHistory] = useState<StockPriceHistory>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const stockData = await getStocks();
      const stockList = Object.entries(stockData).map(([name, ticker]) => ({
        name,
        ticker,
      }));
      setStocks(stockList);
      if (stockList.length > 0) setSelectedStock(stockList[0].ticker);
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    if (!selectedStock) return;
    const fetchPriceHistory = async () => {
      const data = await getStockPrice(selectedStock, minutes);
      setPriceHistory(Array.isArray(data) ? data : [data.stock]);
    };
    fetchPriceHistory();
    const interval = setInterval(fetchPriceHistory, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [selectedStock, minutes]);

  const handleStockChange = (ticker: string) => setSelectedStock(ticker);
  const handleMinutesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMinutes(Number(event.target.value));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stock Price Analysis
      </Typography>
      <StockSelector stocks={stocks} selectedStock={selectedStock} onChange={handleStockChange} />
      <FormControl sx={{ mt: 2, minWidth: 120 }}>
        <InputLabel>Time Interval</InputLabel>
        <Select value={minutes} onChange={handleMinutesChange}>
          {[5, 10, 30, 60].map((min) => (
            <MenuItem key={min} value={min}>
              Last {min} minutes
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StockChart priceHistory={priceHistory} />
    </Container>
  );
};

export default StockPage;
