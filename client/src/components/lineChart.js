import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Use REACT_APP_ prefix
const url = `https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=${apiKey}`;

export const LineChart = () => {
  // Capitalize component name
  const [unemploymentData, setUnemploymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Use async function for data fetching
      try {
        const response = await axios.get(url); // Use await to wait for the response
        setUnemploymentData(response.data); // Set the fetched data
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array for now

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const randomNumGenerator = () => {
    const min = -1000;
    const max = 1000;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => randomNumGenerator()),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => randomNumGenerator()),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line data={data} />
      <div>lineChart</div>;
    </>
  );
};
