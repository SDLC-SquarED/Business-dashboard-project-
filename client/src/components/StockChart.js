import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export const StockChart = ({ ticker }) => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("daily");

  const fetchData = async (selectedInterval) => {
    try {
      const apiKey = process.env.REACT_APP_STOCKCHART;
      const symbol = ticker;
      const intervalMap = {
        daily: "TIME_SERIES_DAILY",
        weekly: "TIME_SERIES_WEEKLY",
        monthly: "TIME_SERIES_MONTHLY",
      };

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=${intervalMap[selectedInterval]}&symbol=${symbol}&apikey=${apiKey}`
      );

      const timeSeries = response.data["Time Series (Daily)"];
      const newData = Object.keys(timeSeries).map((timestamp) => ({
        x: new Date(timestamp),
        y: [
          parseFloat(timeSeries[timestamp]["1. open"]),
          parseFloat(timeSeries[timestamp]["2. high"]),
          parseFloat(timeSeries[timestamp]["3. low"]),
          parseFloat(timeSeries[timestamp]["4. close"]),
        ],
      }));

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [interval, ticker]);

  const handleIntervalChange = (selectedInterval) => {
    setInterval(selectedInterval);
    console.log(interval);
    fetchData(selectedInterval);
  };

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: `${ticker}`,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Stock Candlestick Chart</h2>
      <div className="space-x-4 mt-4">
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            interval === "daily"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleIntervalChange("daily")}
        >
          Daily
        </button>
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            interval === "weekly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleIntervalChange("weekly")}
        >
          Weekly
        </button>
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            interval === "monthly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleIntervalChange("monthly")}
        >
          Monthly
        </button>
      </div>
      <ReactApexChart
        options={options}
        series={[{ data: data }]}
        type="candlestick"
        height={400}
      />
    </div>
  );
};
