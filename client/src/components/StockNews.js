import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const StockNews = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    const apiKey = "Q544DECZWVWNU3FZ";
    const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:BTC,FOREX:USD&time_from=20220410T0130&limit=5&apikey=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        const feed = response.data?.data?.feed || [];
        setNewsData(feed);
      })
      .catch((error) => {
        console.error("Error fetching stock news:", error);
      });
  }, []);
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Stock News</h2>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        width={600}
        height={200}
      >
        {newsData.map((article, index) => (
          <div key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-8 h-8 object-cover rounded"
                />
                <p className="absolute top-0 left-0 bg-blue-500 text-white p-2 text-xs rounded-t">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {article.title}
                  </a>
                </p>
              </div>
            </a>
            <p className="text-gray-500">{article.summary}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default StockNews;
