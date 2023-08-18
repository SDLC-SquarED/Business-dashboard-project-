import "./App.css";
import { StockChart } from "./components/StockChart";
import StockNews from "./components/StockNews";
import { LineChart } from "./components/lineChart";
import { TickerCard } from "./components/TickerCard";

function App() {
  
  return (
    <div className="App">
      <div className="text-2xl text-red-300">Hello World</div>
      <StockNews />
      <LineChart />
      <StockChart />
      <TickerCard />
      
    </div>
  );
}

export default App;
