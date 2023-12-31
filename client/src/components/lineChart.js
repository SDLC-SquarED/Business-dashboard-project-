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

// const apiKey1 = process.env.ALPHA_VANTAGE_API_KEY;
// const apikey2 = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY2;
// console.log(apikey2);

const unemploymentUrl = process.env.REACT_APP_UNEMPLOYMENT_URL;
const inflationUrl = process.env.REACT_APP_INFLATION_URL;

export const LineChart = () => {
  // Capitalize component name
  const [unemploymentData, setUnemploymentData] = useState([]);
  const [inflation, setInflation] = useState([]);

  useEffect(() => {
    const fetchUnemployment = async () => {
      // Use async function for data fetching
      try {
        const response = await axios.get(unemploymentUrl); // Use await to wait for the response
        setUnemploymentData(response.data.data); // Set the fetched data
        // console.log(response.data);
        // console.log("unemployment:", unemploymentData.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchInflation = async () => {
      // Use async function for data fetching
      try {
        const response = await axios.get(inflationUrl); // Use await to wait for the response
        setInflation(response.data.data); // Set the fetched data
        // console.log(response.data);
        // console.log("inflation:", inflation.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUnemployment();
    fetchInflation(); // Call the fetchData function
  }, []); // Empty dependency array for now

  const calculateAnnualAverages = (data) => {
    const annualAverages = data.reduce((accumulator, data) => {
      const year = data.date.split("-")[0];
      if (!accumulator[year]) {
        accumulator[year] = { year, totalValue: 0, count: 0 };
      }
      accumulator[year].totalValue += parseFloat(data.value);
      accumulator[year].count++;
      return accumulator;
    }, {});

    const annualAveragesArray = Object.values(annualAverages).map((entry) => ({
      year: entry.year,
      averageValue: (entry.totalValue / entry.count).toFixed(2),
    }));

    return annualAveragesArray;
  };

  let unemploymentLabel;
  let dataForUnemployment;
  let dataForInflation;

  if (unemploymentData && inflation) {
    let averageUnemployment = calculateAnnualAverages(unemploymentData).slice(
      12,
      -1
    );

    unemploymentLabel = averageUnemployment.map((dataset) => {
      return dataset.year;
    });
    dataForUnemployment = averageUnemployment.map((dataset) => {
      return dataset.averageValue;
    });
    dataForInflation = inflation
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((dataset) => {
        return dataset.value;
      });
  }
  // console.log(unemploymentLabel);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = unemploymentLabel;

  const data = {
    labels,
    datasets: [
      {
        label: "Unemployment",
        data: dataForUnemployment,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Inflation",
        data: dataForInflation,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {},
  };

  return (
    <>
      <h2 className="text-lg font-semibold m-4">
        Unemployment and Inflation over time
      </h2>
      <Line options={options} data={data} />
    </>
  );
};
