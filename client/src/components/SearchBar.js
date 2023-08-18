import React, {useState, useEffect } from 'react';
import axios from "axios";

const SearchBar = () => {
const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'API'; // Replace with API key

    if (searchQuery.trim() !== '') { //Trim stops making a request when there only empty spaces were typed in the search bar
      const url = `https://api.stockdata.org/v1/data/quote?symbols=${searchQuery}&api_token=${apiKey}`

      axios
        .get(url)
        .then(response => {
          const responseData = response.data;
          if (responseData.Note) {
            setError(responseData.Note); // Handle API rate limit error
          } else {
            setData(responseData);
          }
        })
        .catch(err => {
          setError('An error occurred while fetching data.');
          console.error(err);
        });
    } else {
      setData(null);
      setError(null);
    }
  }, [searchQuery]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a ticker symbol"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> //preformatted text HTML would render the data object in a certain format
      ) : (
        <div>No data available. Enter a search keyword to fetch data.</div>

      )}
    </div>
  );
};
export default SearchBar