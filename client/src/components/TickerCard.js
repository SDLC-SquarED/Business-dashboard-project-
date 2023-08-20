import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineBell } from 'react-icons/hi';
import { FiHelpCircle } from 'react-icons/fi';

export const TickerCard = () => {
  const [metaData, setMetaData] = useState({});
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const apiKey = "gPHn8kB1bTYbxwbII0ZUw6KagpfghRCIVfCVJlFs";
    const ticker = "MMC"
    const apiUrl = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${apiKey}`;

    const headers = {
      Authorization: `Bearer ${apiKey}`
    };

    fetch(apiUrl, { headers })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMetaData(data.meta);
        setStockData(data.data);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  const handleIconClick = (action) => {
    console.log(`Clicked ${action} icon`);
  };

  return (
    <div className="flex space-x-4">
      {stockData.length > 0 ? (
        stockData.map((stockItem, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md p-4 flex space-x-6 flex-col"
          >
            <div className="font-bold text-2xl">
              {stockItem.ticker}
            </div>
            <div className="text-gray-600 mt-4">
              <div className="flex justify-between">
                <span>Name:</span>
                <span>{stockItem.name}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>Price:</span>
                <span>{stockItem.price}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>Day Open:</span>
                <span>{stockItem.day_open}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>Day High:</span>
                <span>{stockItem.day_high}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>Day Low:</span>
                <span>{stockItem.day_low}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>Volume:</span>
                <span>{stockItem.volume}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>52 week High:</span>
                <span>{stockItem["52_week_high"]}</span>
              </div>
              <hr className="my-2 border-black" />
              <div className="flex justify-between">
                <span>52 week low:</span>
                <span>{stockItem["52_week_low"]}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleIconClick('Watchlist')}
              >
                <HiHeart className="text-red-500 text-lg" /> Watchlist
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleIconClick('Alert')}
              >
                <HiOutlineBell className="text-blue-500 text-lg" /> Alert
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleIconClick('Help')}
              >
                <FiHelpCircle className="text-green-500 text-lg" /> Help
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
