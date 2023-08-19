import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import DarkModeButton from "./DarkModeButton";
import debounce from 'lodash.debounce';
import logo from "../assets/logo.png";

const apiKey= process.env.REACT_APP_IEX;
console.log(apiKey)

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
      const url = `https://api.iex.cloud/v1/data/core/company/${searchQuery}?token=${apiKey}`;

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
    <div className="grid grid-cols-8 pt-5">
      <img src={logo} alt="Company Logo" className="col-span-1 ml-5" />

      <BsSearch id="BsSearch" className="col-span-1 justify-self-end" />
      <input
        className="col-span-2"
        type="text"
        placeholder="Enter a ticker symbol"
        value={inputValue}
        onChange={handleSearchChange}
      />
     
      <div className="col-span-3"></div> {/* Empty space */}
      <p className="col-span-1 justify-self-end mr-4"><DarkModeButton/></p>
    </div>
  );
};
export default SearchBar;
