import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import StockNews from "./StockNews";
import Chart from "./Chart";

function Stock() {
  const { stockId } = useParams();
  const stock = useSelector(state => state.stocks.stock);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!stockId) {
      return;
    }
    (async () => {
      await dispatch(getStock(stockId));
    })();
  }, [stockId]);

  if (!stock) {
    return null;
  }

  return (
    <div id="main-stock-div">
      <ul id="stock-info">
        <li>
          <strong>Stock Name</strong> {stock["companyName"]}
        </li>
        <li>
          <strong>Latest Price</strong> {stock["latestPrice"]}
        </li>
        <li>
          <strong>Market Cap</strong> {stock["marketCap"]}
        </li>
      </ul>
      <Chart
        stock={stock["chart"]}
        stockName={stock["companyName"]}
        color={"green"}
      />
      <div id="news-container">
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Recent News
        </h1>
        {stock["news"].map(article => {
          return <StockNews key={article.id} news={article} />;
        })}
      </div>
    </div>
  );
}
export default Stock;
