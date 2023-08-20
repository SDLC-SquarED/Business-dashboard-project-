import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    // Fetch watchlist data from the backend based on the logged-in user
    const fetchWatchlistData = async () => {
      try {
        const response = await axios.get('/api/watchlist'); // Replace with your API endpoint
        setWatchlistData(response.data);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      }
    };

    fetchWatchlistData();
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>
      <ul>
        {watchlistData.map((stock) => (
          <li key={stock.id}>{stock.symbol}</li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
