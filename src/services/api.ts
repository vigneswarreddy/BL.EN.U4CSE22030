import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';
let accessToken: string | null = null;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const authenticate = async (credentials: {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}) => {
  const response = await api.post('/auth', credentials);
  accessToken = response.data.access_token;
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const getStocks = async () => {
  const response = await api.get('/stocks');
  return response.data.stocks;
};

export const getStockPrice = async (ticker: string, minutes?: number) => {
  const url = minutes ? `/stocks/${ticker}?minutes=${minutes}` : `/stocks/${ticker}`;
  const response = await api.get(url);
  return response.data;
};

// Initialize authentication (call this once during app startup)
authenticate({
  email: 'vigneswarreddy.2005@gmail.com',
  name: 'Kamalapuram Vigneswara Reddy',
  rollNo: 'BL.EN.U4CSE22030',
  accessCode: 'SwuuKE',
  clientID: '354439b7-aab2-4bfd-b837-e814a3e7efd5',
  clientSecret: 'teZhbPnVmYuZGRwP',
});