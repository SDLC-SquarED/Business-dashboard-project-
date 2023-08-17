import "./App.css";
import StockNews from "./components/StockNews";
import { LineChart } from "./components/lineChart";

function App() {
  return (
    <div className="App">
      <div className="text-2xl text-red-300">Hello World</div>
      <StockNews />
      <LineChart />
    </div>
  );
}

export default App;
//
