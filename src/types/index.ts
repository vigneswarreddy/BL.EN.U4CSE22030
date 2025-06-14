export interface Stock {
  name: string;
  ticker: string;
}

export interface StockPrice {
  price: number;
  lastUpdatedAt: string;
}

export interface StockPriceHistory extends Array<StockPrice> {}
