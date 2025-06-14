import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import StockPage from './pages/StockPage';
import HeatmapPage from './pages/HeatmapPage';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
