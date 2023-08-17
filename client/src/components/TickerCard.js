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
    <div>
      <div>TickerCard</div>
      <div className="text-2xl text-red-300">Testing</div>
      {stockPrice !== null ? (
        <div>
          <h2>IBM Stock Price</h2>
          <div>Price: {stockPrice}</div>
        </div>
      ) : (
        <div>Loading stock price...</div>
      )}
    </div>
  );
};


