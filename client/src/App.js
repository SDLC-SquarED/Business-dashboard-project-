import "./App.css";

import { LineChart } from "./components/lineChart";

import StockNews from "./components/StockNews";

function App() {
  return (
    <div className="App">
      <div className="text-2xl text-red-300">Hello World</div>

      <LineChart />

      <StockNews />
    </div>
  );
}

export default App;
