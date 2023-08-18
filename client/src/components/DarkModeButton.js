import React, { useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { BsMoonStarsFill } from "react-icons/bs";


const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkMode ? <BsSunFill/> : <BsMoonStarsFill/>}
      </button>
    </div>
  );
};

export default DarkModeButton;