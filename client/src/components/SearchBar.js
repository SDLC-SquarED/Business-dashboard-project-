import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import DarkModeButton from "./DarkModeButton";
import debounce from 'lodash.debounce';

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const debouncedSearch = useCallback(
    debounce((nextValue) => handleSearch(nextValue), 800),
    []
  );
  

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      //Trim stops making a request when only empty spaces are typed in the search bar
      const url = `https://api.iex.cloud/v1/data/core/company/${searchQuery}?token=`;

      axios
        .get(url)
        .then((response) => {
          const responseData = response.data;
          if (responseData.Note) {
            setError(responseData.Note); // Handle API rate limit error
          } else {
            console.log(responseData)
            setData(responseData);
            setLoaded(true);
                 if(props.onDataLoaded) {
              props.onDataLoaded(responseData);
            }
          }
        })
        .catch((err) => {
          setError("An error occurred while fetching data.");
          console.error(err);
        });
    } else {
      setData(null);
      setError(null);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value)
    debouncedSearch(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items p-5">
      <BsSearch id="BsSearch" className="mr-1" />

      <input
        type="text"
        width={1}
        placeholder="Enter a ticker symbol"
        value={inputValue}
        onChange={handleSearchChange}
        className="flex-1 outline-none borer rounded-l-none"
      />

{isLoaded && <button onClick={() => setLoaded(false)} ></button>}
    <DarkModeButton />
    </div>
  );
};
export default SearchBar;
