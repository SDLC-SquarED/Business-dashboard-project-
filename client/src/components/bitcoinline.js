
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, Title, Tooltip } from "chart.js";

const bitcoinUrl = `https://api.coindesk.com/v1/bpi/currentprice.json`;

const ChartComponent = () => {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get(bitcoinUrl);
        setBitcoinData(response.data.bpi);
        setLastUpdated(response.data.time.updated);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBitcoinData();
    const interval = setInterval(fetchBitcoinData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const calculatePrices = (data) => {
    return Object.entries(data).map(([currency, priceInfo]) => ({
      currency,
      price: priceInfo.rate_float,
    }));
  };

  let bitcoinLabels = [];
  let dataForBitcoin = [];

  if (bitcoinData) {
    const bitcoinPrices = calculatePrices(bitcoinData);
    bitcoinLabels = bitcoinPrices.map((currencyData) => currencyData.currency);
    dataForBitcoin = bitcoinPrices.map((currencyData) => currencyData.price);
  }

  ChartJS.register(LinearScale, Title, Tooltip);

  const labels = bitcoinLabels;

  const data = {
    labels,
    datasets: [
      {
        label: "Bitcoin Price",
        data: dataForBitcoin,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Live Bitcoin Price (Last updated: ${lastUpdated})`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default ChartComponent;