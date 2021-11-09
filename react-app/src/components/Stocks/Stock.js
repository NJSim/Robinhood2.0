import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import StockNews from "./StockNews";

import "./Stock.css";
import Chart from "./Chart";
import loadingSpinner from "../Stocks/green-loading-spinner.gif";
import { executeTransaction } from "../../store/transactions";


function Stock() {
  const { stockId } = useParams();
  const stock = useSelector(state => state.stocks.stock);
  const userId = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();

// working on
  const user = useSelector(state => state.session.user);
  const [share, setShare] = useState(0)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [errors, setErrors] = useState([])



  // useEffect(() => {
  //   const errors = [];

  //   if(share === 0) errors.push("Please enter a valid number of shares");
  //   // if(share * stock["latestPrice"] > user["buying_pwr"]) errors.push("You don't have enough buying power to place this order.");

  //   setErrors(errors)
  // },[share, stock])

  const submitBuy = (e) => {
    e.preventDefault();
    setEstimatedCost(share * stock.latestPrice)

    const payload = {
      share,
      estimatedCost
    }

  }


  useEffect(() => {
    if (!stockId) {
      return;
    }
    (async () => {
      await dispatch(getStock(stockId));
    })();
  }, [stockId]);

  if (!stock) {
    return (
      <div id="loading">
        <img src={loadingSpinner} alt="Loading..." />
      </div>
    );
  }

  const purchaseStock = async () => {
    const data = {
      user_id: userId,
      asset_id: stockId,
      shares: share,
      order_price: stock["latestPrice"],
      buy: true,
      sell: false,
    };
    const trans = await dispatch(executeTransaction(data));
  };

  return (
    <div id="main-stock-div">



        <div className="buy-stock-div">
          <div>
            <div className="buy-stock-div1">
              <form  className='buy-stock-form' onSubmit={submitBuy}>

                <div className="assestSymboldiv"> <span className="spanBuy"> Buy {stock["symbol"]} </span> </div>
                <div>
                  <label className="InvestLabel"> Invest In</label>
                  <span className="InvestLabel InvestLabelSpan"> Shares </span>
                </div>
                <div>
                  <label className="InvestLabel">
                    Shares
                    <input
                    maxlength="8"
                    className="buyInput"
                    type="integer"
                    required
                    value={share}
                    onChange={(e) => setShare(e.target.value)}
                    spellcheck='false'
                    placeholder='0'
                    onKeyPress={(e) => {
                      if (!/[0-9.]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    />
                  </label>
                </div>

                <div className="il4div">
                  <span className="InvestLabel il4">Market Price</span>
                  <span className="InvestLabel il4s">${stock["latestPrice"].toLocaleString('en')}</span>
                </div>

                <div>
                  <span className="InvestLabel ES1">Estimated Cost</span>
                  <span className="InvestLabel ES2"> ${(share * stock.latestPrice).toLocaleString('en')} </span>
                </div>
                <div><button className="reviewOrder" onClick={purchaseStock}>Review Order</button></div>

                <div><span className="InvestLabel il5">${user["buying_pwr"].toLocaleString('en')} buying power available</span></div>

              </form>
            </div>
                <div><button className="addTolist">Add to Lists</button></div>
          </div>
        </div>









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
