import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return <div>lineChart</div>;
};
