import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(BarElement);

const BitcoinChart = () => {
  const [chart, setChart] = useState({});
  const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  const apiKey = "coinrankingd4a23cdd9810989493fefa52536e5ab5af27ece948a123e2";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': apiKey,
            'Access-Control-Allow-Origin': "*"
          }
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json.data);
          setChart(json.data);
        } else {
          console.log('Network response was not ok');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchCoins();
  }, [baseUrl, apiKey]);

  console.log("chart", chart);

  const data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length}`,
      data: chart?.coins?.map(x => x.price),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 10,
      },
    },
  };

  return (
    <div>
      <Doughnut
        data={data}
        height={350}
        options={options}
      />
    </div>
  );
};

export default BitcoinChart;
