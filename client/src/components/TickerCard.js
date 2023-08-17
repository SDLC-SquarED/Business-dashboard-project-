import React, { useEffect, useState } from 'react';

export const TickerCard = () => {
  const [stockPrice, setStockPrice] = useState(null);

  useEffect(() => {
    const symbol = 'IBM';
    const apiKey = '1KK0ID0UN3K5BX02'; // Your actual API key
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const timeSeries = data['Time Series (5min)'];
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestPrice = timeSeries[latestTimestamp]['1. open'];
        setStockPrice(latestPrice);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '8px' }}>TickerCard</div>
      <div style={{ fontSize: '20px', color: '#F87171', marginBottom: '16px' }}>Testing</div>
      {stockPrice !== null ? (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>IBM Stock Price</h2>
          <div style={{ fontSize: '24px', color: '#34D399' }}>Price: {stockPrice}</div>
        </div>
      ) : (
        <div style={{ color: '#6B7280' }}>Loading stock price...</div>
      )}
    </div>
  );
};
