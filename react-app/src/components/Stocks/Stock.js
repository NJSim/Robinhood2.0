import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import StockNews from "./StockNews";
import loadingSpinner from "../Stocks/green-loading-spinner.gif"
import { executeTransaction } from "../../store/transactions";

function Stock() {
  const { stockId } = useParams();
  const stock = useSelector(state => state.stocks.stock);
  const userId = useSelector(state => state.session.user.id)
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
    return <div id="loading">
    <img src={loadingSpinner} alt="Loading..." />
    </div>
  }
 const purchaseStock = async() => {
   const data = {
			user_id: userId,
			asset_id: stockId,
			shares: 5,
			order_price: stock["latestPrice"],
      buy: true,
      sell: false
		};
    const trans = await dispatch(executeTransaction(data))
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
        <li>
          <button onClick={purchaseStock}>Buy 5 shares</button>
        </li>
      </ul>
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
