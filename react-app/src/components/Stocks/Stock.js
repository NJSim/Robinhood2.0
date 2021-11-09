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

  const [timeFrame, setTimeFrame] = useState("chart_1d");
  const dispatch = useDispatch();

  // working on
  const user = useSelector(state => state.session.user);
  const [share, setShare] = useState(0);
  const [showSell, setShowSell] = useState(false);
  const [showBuy, setShowBuy] = useState(true);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   const errors = [];

  //   if(share === 0) errors.push("Please enter a valid number of shares");
  //   // if(share * stock["latestPrice"] > user["buying_pwr"]) errors.push("You don't have enough buying power to place this order.");

  //   setErrors(errors)
  // },[share, stock])

  const submitBuy = e => {
    e.preventDefault();
    setEstimatedCost(share * stock.latestPrice);

    const payload = {
      share,
      estimatedCost,
    };
  };

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

  const showSellForm = () => {
    if (showSell === false) {
      setShowSell(true);
      setShowBuy(false);
      document.querySelector(".spanSell").style.color = "rgb(255, 80, 0, 1)";
      document.querySelector(".spanBuy").style.color = "black";
    }
  };

  const showBuyForm = () => {
    if (showBuy === false) {
      setShowSell(false);
      setShowBuy(true);
      document.querySelector(".spanBuy").style.color = "rgb(255, 80, 0, 1)";
      document.querySelector(".spanSell").style.color = "black";
    }
  };

  return (
    <div id="main-stock-div">
      <div className="buy-stock-div">
        <div>
          <div className="buy-stock-div1">
            <form className="buy-stock-form" onSubmit={submitBuy}>
              <div className="assestSymboldiv">
                <span className="turnOrange spanBuy" onClick={showBuyForm}>
                  {" "}
                  Buy {stock["symbol"]}{" "}
                </span>
                <span className="turnOrange spanSell" onClick={showSellForm}>
                  {" "}
                  Sell {stock["symbol"]}{" "}
                </span>
              </div>
              <div>
                <label className="InvestLabel"> Invest In</label>
                <span className="InvestLabel InvestLabelSpan"> Shares </span>
              </div>

              <div>
                <label className="InvestLabel">
                  Shares
                  <input
                    maxLength="8"
                    className="buyInput"
                    type="integer"
                    required
                    value={share}
                    onChange={e => setShare(e.target.value)}
                    spellCheck="false"
                    placeholder="0"
                    onKeyPress={e => {
                      if (!/[0-9.]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </label>
              </div>

              <div className="il4div">
                <span className="InvestLabel il4">Market Price</span>
                <span className="InvestLabel il4s">
                  ${stock["latestPrice"].toLocaleString("en")}
                </span>
              </div>

              <div>
                {showSell ? (
                  <span className="InvestLabel ES1">Estimated Credit</span>
                ) : (
                  <span className="InvestLabel ES1">Estimated Cost</span>
                )}
                <span className="InvestLabel ES2">
                  {" "}
                  ${(share * stock.latestPrice).toLocaleString("en")}{" "}
                </span>
              </div>
              {showSell ? (
                <div>
                  <button className="reviewOrder" onClick={purchaseStock}>
                    Review Order Sell
                  </button>
                </div>
              ) : (
                <div>
                  <button className="reviewOrder" onClick={purchaseStock}>
                    Review Order Buy
                  </button>
                </div>
              )}
              {showSell ? (
                <div>
                  <span className="InvestLabel il5">
                    1 Share Available-Sell All
                  </span>
                </div>
              ) : (
                <div>
                  <span className="InvestLabel il5">
                    ${user["buying_pwr"].toLocaleString("en")} buying power
                    available
                  </span>
                </div>
              )}
            </form>
          </div>
          <div>
            <button className="addTolist">Add to Lists</button>
          </div>
        </div>
      </div>
      <Chart
        timeFrame={timeFrame}
        stock={stock}
        stockName={stock["companyName"]}
        color={"#00a806"}
      />
      <div id="timeFrameDiv">
        <button
          className="timeFrameButton"
          onClick={e => setTimeFrame("chart_1d")}
        >
          daily
        </button>
        <button
          className="timeFrameButton"
          onClick={e => setTimeFrame("chart_1m")}
        >
          monthly
        </button>
        <button
          className="timeFrameButton"
          onClick={e => setTimeFrame("chart_1y")}
        >
          yearly
        </button>
      </div>
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
