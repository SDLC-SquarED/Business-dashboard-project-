import React, { useState, useEffect } from "react";
import axios from "axios";

const StockNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiKey = "AimwuL2msGtAGwD3n2PEsBexn9RTDMv7FxcA0vZo";
    const apiUrl = `https://api.stockdata.org/v1/news/all?api_token=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        const articles = response.data.data || [];
        // Filter out articles that are not in English
        const englishArticles = articles.filter((article) => article.language === "en");
        setNewsData(englishArticles);
      })
      .catch((error) => {
        console.error("Error fetching stock news:", error);
      });
  }, []); // Empty dependency array, runs once on component mount

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Stock News</h2>
      <ul className="space-y-4">
        {newsData.map((article, index) => (
          <li key={index}>
            <div className="flex space-x-4 items-center">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-gray-500">{article.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockNews;
