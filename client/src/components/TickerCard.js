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
        setStockData(data); 
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  const handleHeartClick = () => {
    // Handle click logic for heart icon
    console.log('Watchlist icon clicked');
  };

  const handleBellClick = () => {
    // Handle click logic for bell icon
    console.log('Alerts icon clicked');
  };

  
  const handleHelpClick = () => {
    // Handle click logic for help icon
    console.log('Help icon clicked');
  };

  return (
    <div className="flex space-x-4">
      {stockData.length > 0 ? (
        stockData.map((stockItem, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="font-bold text-2xl mb-2">
              {stockItem.symbol} ({stockItem.symbol})
            </div>
            <div className="text-red-500 text-2xl flex space-x-4">
              <button onClick={handleHeartClick} className="flex flex-col items-center">
                <HiHeart />
                <div className="text-xs">Watchlist</div>
              </button>
              <button onClick={handleBellClick} className="flex flex-col items-center">
                <HiOutlineBell />
                <div className="text-xs">Alerts</div>
              </button>
              <button onClick={handleHelpClick} className="flex flex-col items-center">
                <FiHelpCircle />
                <div className="text-xs">Help</div>
              </button>
            </div>
            <div className="text-gray-600 mt-2">
              <div>Price: {stockItem.price}</div>
              <div>Previous Close: {stockItem.close}</div>
              <div>Day Open: {stockItem.open}</div>
              <div>Day High: {stockItem.high}</div>
              <div>Day Low: {stockItem.low}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">Loading stock data...</div>
      )}
    </div>
  );
};



