import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

export const StockChart = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("daily");

  const ticker = "MMC";

  const fetchData = async (selectedInterval) => {
    try {
      // const apiKey = 'S7SGFN9B5587KDLS';
      const apiKey = "1KK0ID0UN3K5BX02";
      const symbol = ticker;
      const intervalMap = {
        daily: "TIME_SERIES_DAILY",
        weekly: "TIME_SERIES_WEEKLY",
        monthly: "TIME_SERIES_MONTHLY",
      };

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=${intervalMap[selectedInterval]}&symbol=${symbol}&apikey=${apiKey}`

        //`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MMC&apikey=S7SGFN9B5587KDLS`
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
  }, [interval]);

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
      <h2>Stock Candlestick Chart</h2>
      <div>
        <button onClick={() => handleIntervalChange("daily")}>Daily</button>
        <button onClick={() => handleIntervalChange("weekly")}>Weekly</button>
        <button onClick={() => handleIntervalChange("monthly")}>Monthly</button>
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
