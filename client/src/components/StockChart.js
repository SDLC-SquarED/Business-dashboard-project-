import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const StockChart = () => {
  const [interval, setInterval] = useState('daily');
  const [chartData, setChartData] = useState([]);

  const fetchData = async (selectedInterval) => {
    try {
      const apiKey = '1KK0ID0UN3K5BX02';
      const symbol = 'AAPL';
      const intervalMap = {
        daily: 'TIME_SERIES_DAILY',
        weekly: 'TIME_SERIES_WEEKLY',
        monthly: 'TIME_SERIES_MONTHLY',
      };

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=${intervalMap[selectedInterval]}&symbol=${symbol}&apikey=${apiKey}`
      );

      const timeSeries = response.data['Time Series (Daily)'];
      const data = Object.keys(timeSeries).map((timestamp) => ({
        date: moment(timestamp).format('MMM D, YYYY'),
        price: parseFloat(timeSeries[timestamp]['1. open']),
      }));

      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleIntervalChange = (selectedInterval) => {
    setInterval(selectedInterval);
  };

  useEffect(() => {
    fetchData(interval);
  }, [interval]);

  return (
    <div>
      <h2>Stock Price Line Chart</h2>
      <div>
        <button onClick={() => handleIntervalChange('daily')}>Daily</button>
        <button onClick={() => handleIntervalChange('weekly')}>Weekly</button>
        <button onClick={() => handleIntervalChange('monthly')}>Monthly</button>
      </div>
      <div>
        <LineChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};
