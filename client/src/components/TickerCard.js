import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineBell } from 'react-icons/hi';
import { FiHelpCircle } from 'react-icons/fi';

export const TickerCard = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/MSFT?token=sk_f2e1bc88cb154c7e8b4ca5a3a68bc80c`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStockData(data); // Assuming data is an array
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  return (
    <div className="flex space-x-4">
      {stockData.length > 0 ? (
        stockData.map((stockItem, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl">
                {stockItem.symbol} ({stockItem.symbol})
              </div>
              <div className="text-gray-600">
                <div>Price: {stockItem.price}</div>
                <div>Previous Close: {stockItem.close}</div>
                <div>Day Open: {stockItem.open}</div>
                <div>Day High: {stockItem.high}</div>
                <div>Day Low: {stockItem.low}</div>
              </div>
              <div className="text-red-500 text-2xl">
                <HiHeart />
                <HiOutlineBell />
                <FiHelpCircle />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">Loading stock data...</div>
      )}
    </div>
  );
};
