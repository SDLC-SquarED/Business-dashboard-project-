import "./App.css";
import { StockChart } from "./components/StockChart";
import StockNews from "./components/StockNews";
import { LineChart } from "./components/lineChart";
import BitcoinChart from "./components/bitcoinchart"

function App() {
  return (
    <div className="h-screen w-full bg-gray-100 p-4 dark:bg-black">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-neutral-400 via-neutral-300 to-zinc-300 mb-4">
        <h1 className="text-white text-center p-4">Header</h1>
      </div>

      <div className="flex flex-col md:flex-row flex-1 mb-4">
        {/* Left Sidebars */}
        <div className="flex-none w-full md:w-1/4 flex flex-col mb-4 md:mb-0 md:mr-4">
          {/* Left Sidebar Top Rectangle */}
          <div className="flex-1 bg-amber-400 mb-4">
            <p className="text-white text-center p-4">
              Left Sidebar Top Rectangle
            </p>
          </div>

          {/* Side Bar Bottom Rectangle */}
          <div className="flex-1 bg-zinc-300">
            <p className="text-white text-center p-4">
              Side Bar Bottom Rectangle
              <BitcoinChart/>
            </p>
          </div>
        </div>

        {/* Middle content */}
        <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
            {/* Left middle rectangle */}
            <div className="bg-zinc-300 p-4">
              <StockChart />
              <p className="text-white text-center">Left middle rectangle</p>
            </div>

            {/* Right middle chart */}
            <div className=" bg-zinc-300">
              <LineChart />
              <p className="text-white text-center">Right middle chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* News */}
      <div className="h-1/3 bg-cyan-600 mt-4">
        <StockNews />
        <p className="text-white text-center p-4">News</p>
      </div>
    </div>
  );
}

export default App;
