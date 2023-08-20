import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const StockNews = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_IEX;
    const apiUrl = `https://api.stockdata.org/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=${apiKey}`;
    
    axios
      .get(apiUrl)
      .then((response) => {
        const articles = response.data.data || [];
        const englishArticles = articles.filter(
          (article) => article.language === "en"
        );
        setNewsData(englishArticles);
      })
      .catch((error) => {
        console.error("Error fetching stock news:", error);
      });
  }, []);
  return (
    <div className="bg-gray-00 p-0 rounded shadow text-center">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={33.33} // Each slide occupies 33.33% of the width
        autoPlay={true}
        stopOnHover={true}
        infiniteLoop={true}
      >
        {newsData.map((article, index) => (
          <div key={index} className="p-4 relative">
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-25 h-22 object-cover rounded-2xl p-4"
              />
            )}
            <div className="absolute top-0 left-0 bg-blue-800 bg-opacity-75 text-white p-1 m-9 ml-9 rounded-t">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {article.title}
              </a>
            </div>
            <div className="m-0 text-gray-600">{article.description}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default StockNews;

