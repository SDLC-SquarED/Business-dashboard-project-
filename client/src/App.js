import "./App.css";
import React, { useState } from "react";
import { StockChart } from "./components/StockChart";
import StockNews from "./components/StockNews";
import { LineChart } from "./components/lineChart";
import BitcoinChart from "./components/bitcoinchart";
import { TickerCard } from "./components/TickerCard";

import SearchBar from "./components/SearchBar";
import CompanyModal from "./components/CompanyModal";
import ChartComponent from "./components/bitcoinline";

function App() {
  const [companyData, setCompanyData] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState("MMC");

  const closeModal = () => {
    setCompanyData(null);
  };

  const handleDataLoaded = (data) => {
    console.log(data);
    setCompanyData(data);
  };

  const handleTickerChange = (ticker) => {
    setSelectedTicker(ticker);
  };

  return (
    <div className="h-full w-full bg-gray-100 p-4 dark:bg-black">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-neutral-400 via-neutral-300 to-zinc-300 mb-4">
        <SearchBar
          onDataLoaded={handleDataLoaded}
          onTickerChange={handleTickerChange}
        />
      </div>

      <div className="flex flex-col md:flex-row flex-1 mb-4 content-center">
        {/* Left sidebars */}
        <div className="flex-none justify-center md:w-1/4 flex flex-col mb-4 md:mb-0 md:mr-4">
          {/* Left Sidebar Top Rectangle */}
          <TickerCard selectedTicker={selectedTicker} />
          <div className="flex-1 mb-4"></div>
          {/* Left sidebar bottom rectangle */}
          <div className="flex-1 bg-zinc-300">
            <p className="text-center p-4">
              {/* <ChartComponent /> */}
              <BitcoinChart />
            </p>
          </div>
        </div>

        {/* Middle content */}
        <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
            {/* Left middle rectangle */}
            <div className="bg-zinc-300 p-4">
              <StockChart ticker={selectedTicker} />
            </div>

            {/* Right middle chart */}
            <div className=" bg-zinc-300">
              <LineChart />
            </div>
          </div>
        </div>
      </div>

      {/* News */}
      <p className="text-black font-extrabold text-xl text-center ">
        Latest News
      </p>
      <div className="h-1/2.5 bg-cyan-600 mt-0 dark:bg-black">
        <StockNews />
      </div>
      {companyData && (
        <CompanyModal companyData={companyData} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
