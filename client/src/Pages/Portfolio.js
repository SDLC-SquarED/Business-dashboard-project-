import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    // Fetch portfolio data from the backend based on the logged-in user
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('/api/portfolio'); // Replace with your API endpoint
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div>
      <h2>Portfolio</h2>
      <ul>
        {portfolioData.map((stock) => (
          <li key={stock.id}>
            {stock.symbol} - Quantity: {stock.quantity} - Value: {stock.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
