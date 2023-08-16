import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Import the Line component from react-chartjs-2
import "chartjs-plugin-datalabels"; // Import chartjs-plugin-datalabels if needed

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
        setUnemploymentData(response.data.data);
        // console.log(response.data); // Set the fetched data
        console.log(unemploymentData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array for now

  // Create chart data
  const chartData = {
    labels: unemploymentData.map((data) => data.label), // Assuming the API response has a 'label' property
    datasets: [
      {
        label: "Unemployment Data",
        data: unemploymentData.map((data) => data.value), // Assuming the API response has a 'value' property
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        lineTension: 0.1,
      },
    ],
  };

  return (
    <>
      <div>lineChart</div>
      {/* <Line data={chartData} options={{ maintainAspectRatio: false }} /> */}
    </>
  );
};
