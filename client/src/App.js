import "./App.css";
import { StockChart } from "./components/StockChart";
import StockNews from "./components/StockNews";
import { LineChart } from "./components/lineChart";

function App() {
  
  return (
    <div className="App">
      <div className="text-2xl text-red-300">Hello World</div>
      <StockNews />
      <LineChart />
      <StockChart />
    </div>
  );
}

export default App;

