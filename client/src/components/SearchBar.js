import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import DarkModeButton from "./DarkModeButton";
import debounce from "lodash.debounce";
import logo from "../assets/logo.png";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom"; // Import Link

const apiKey = process.env.REACT_APP_IEX;
console.log(apiKey);

const SearchBar = ({onDataLoaded, onTickerChange} ) => {
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
      const url = `https://api.iex.cloud/v1/data/core/company/${searchQuery}?token=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          const responseData = response.data;
          if (responseData.Note) {
            setError(responseData.Note);
          } else {
            console.log(responseData);
            setData(responseData);
            setLoaded(true);
            if (onDataLoaded) {
              onDataLoaded(responseData);
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
    const value = event.target.value.toUpperCase();
    setInputValue(value);
    debouncedSearch(value);
    onTickerChange(value);
  };

  const handleLogout = () => {
    googleLogout();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const username = localStorage.getItem("userInfo");

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
      <div className="col-span-1 flex justify-end items-center mr-4">
        <div className="flex items-center"> {/* Wrap the Welcome message */}
          <p className="mr-12 pr-12 text-black-800 font-bold">Welcome,{username}!</p> {/* Add more spacing */}
          <Link to="/portfolio" className="mr-4 text-blue-700 font-bold first-letter:hover:underline">
            Portfolio
          </Link>
          <Link to="/watchlist" className="mr-4 text-blue-700 font-bold hover:underline">
            Watchlist
          </Link>
          <Link to="/logout" className="mr-4 text-blue-700 font-bold hover:underline">
            Logout
          </Link>
        </div>
        <DarkModeButton />
      </div>
    </div>
  );
};

export default SearchBar;
