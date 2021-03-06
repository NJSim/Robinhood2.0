import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import { authenticate } from "../../store/session";
import StockNews from "./StockNews";
import Modal from "../Modal/Modal";
import { MechanicalCounter } from "mechanical-counter";
import "./Stock.css";
import Chart from "./Chart";
import loadingSpinner from "../../images/green-loading-spinner.gif";
import { executeTransaction } from "../../store/transactions";
import StockList from "../StockList/StockList";

function Stock() {
  const { stockId } = useParams();
  const stock = useSelector(state => state.stocks.stock);
  const userId = useSelector(state => state.session.user.id);

  const [transResult, setTransResult] = useState(false);
  const [timeFrame, setTimeFrame] = useState("chart_1d");
  const dispatch = useDispatch();

  // working on
  const user = useSelector(state => state.session.user);
  const [share, setShare] = useState("");
  const [showSell, setShowSell] = useState(false);
  const [showBuy, setShowBuy] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // lists modal states
  const [show, setShow] = useState(false);

  const [chartPrice, setChartPrice] = useState();

  useEffect(() => {
    (async () => {
      setLoaded(false);
      await dispatch(getStock(stockId));
      setLoaded(true);
    })();
  }, [stockId]);
  if (!stock || !loaded) {
    return (
      <div id="loading">
        <img src={loadingSpinner} alt="Loading..." />
      </div>
    );
  }

  const purchaseStock = async () => {
    const purchasePrice = stock['latestPrice'];
    const data = {
      user_id: userId,
      asset_id: stockId,
      shares: share,
      order_price: stock["latestPrice"],
      buy: true,
      sell: false,
    };
    const trans = await dispatch(executeTransaction(data));
    if (trans.errors) {
      setErrors(trans.errors);
    } else {
      setShare("");
      setErrors([]);
      const transMessage =
				share > 1
					? `${share} shares purchased at $${purchasePrice}/share`
					: `${share} share purchased at $${purchasePrice}`;
      setTransResult(transMessage);
			await setTimeout(() => {
				setTransResult(false);
			}, 4000);
    }
    dispatch(authenticate());
    dispatch(getStock(stockId));
  };
  const sellStock = async () => {
    const purchasePrice = stock["latestPrice"];
    const data = {
      user_id: userId,
      asset_id: stockId,
      shares: share,
      order_price: stock["latestPrice"],
      buy: false,
      sell: true,
    };
    const trans = await dispatch(executeTransaction(data));

    if (trans.errors) {
      setErrors(trans.errors);
    } else {
      setShare("");
      setErrors([]);
      const transMessage =
				share > 1
					? `${share} shares sold at $${purchasePrice}/share`
					: `${share} share sold at $${purchasePrice}`;
			setTransResult(transMessage);
			await setTimeout(() => {
				setTransResult(false);
			}, 4000);
    }
    dispatch(authenticate());
    dispatch(getStock(stockId));
  };
  const showSellForm = () => {
    if (showSell === false) {
      setErrors([]);
      setShare("")
      setShowSell(true);
      setShowBuy(false);
      document.querySelector(".spanSell").style.color = "rgb(255, 80, 0, 1)";
      document.querySelector(".spanBuy").style.color = "black";
    }
  };

  const showBuyForm = () => {
    if (showBuy === false) {
      setErrors([]);
      setShare("")
      setShowSell(false);
      setShowBuy(true);
      document.querySelector(".spanBuy").style.color = "rgb(255, 80, 0, 1)";
      document.querySelector(".spanSell").style.color = "black";
    }
  };
  const childToParent = data => {
    setChartPrice(data);
  };
  return (
		<div id="main-stock-div">
			<div id="stock-graph-trans">
				<div>
					<h1>{stock["companyName"]}</h1>
					<div
						style={{
							display: "flex",
							fontWeight: 900,
							fontSize: 35,
							alignItems: "center",
						}}
					>
						<p>$</p>
						<MechanicalCounter
							text={
								chartPrice
									? chartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									: stock["latestPrice"]
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							}
						/>
					</div>

					<h4 id="stock-change">
						{stock["change"] > 0
							? "+$" + stock["change"] + " "
							: "$" + stock["change"] + " "}
						{stock["changePercent"] > 0
							? "(" + "+" + (stock["changePercent"] * 100).toFixed(3) + "%) "
							: "(" + (stock["changePercent"] * 100).toFixed(3) + "%) "}
						<span style={{ fontWeight: 0, color: "#697277" }}>Today</span>
					</h4>
					<Chart
						timeFrame={timeFrame}
						stock={stock}
						color={"#00a806"}
						childToParent={childToParent}
						height={250}
						width="50vw"
					/>
					<div id="timeFrameDiv">
						<button
							className="timeFrameButton"
							onClick={(e) => setTimeFrame("chart_1d")}
						>
							1D
						</button>
						<button
							className="timeFrameButton"
							onClick={(e) => setTimeFrame("chart_1m")}
						>
							1M
						</button>
						<button
							className="timeFrameButton"
							onClick={(e) => setTimeFrame("chart_1y")}
						>
							1Y
						</button>
					</div>
					<div id="news-container">
						<div style={{ borderBottom: "1px solid #E3E9ED" }}>
							<h1 style={{ textAlign: "left", marginBottom: "10px" }}>
								Key Statistics
							</h1>
						</div>
						<div style={{ display: "flex" }}>
							<div id="statistic-div">
								<div
									style={{ fontSize: 13, fontWeight: 900, paddingBottom: 10 }}
								>
									Average Volume
								</div>
								<div>
									{stock["avgTotalVolume"] ? stock["avgTotalVolume"] : "----"}
								</div>
							</div>
							<div id="statistic-div">
								<div
									style={{ fontSize: 13, fontWeight: 900, paddingBottom: 10 }}
								>
									Price-Earnings Ratio
								</div>
								<div>{stock["peRatio"] ? stock["peRatio"] : "----"}</div>
							</div>
							<div id="statistic-div">
								<div
									style={{ fontSize: 13, fontWeight: 900, paddingBottom: 10 }}
								>
									52 Week High
								</div>
								<div>
									{stock["week52High"] ? `$${stock["week52High"]}` : "----"}
								</div>
							</div>
							<div id="statistic-div">
								<div
									style={{ fontSize: 13, fontWeight: 900, paddingBottom: 10 }}
								>
									52 Week Low
								</div>
								<div>
									{stock["week52Low"] ? `$${stock["week52Low"]}` : "----"}
								</div>
							</div>
						</div>
					</div>
					<div id="news-container">
						<div style={{ borderBottom: "1px solid #E3E9ED" }}>
							<h1 style={{ textAlign: "left", marginBottom: "10px" }}>News</h1>
						</div>
						{stock["news"].map((article) => {
							return <StockNews key={article.id} news={article} />;
						})}
					</div>
				</div>
				<div className="buy-stock-div">
					<div
						style={{ float: "right", margin: 0, position: "sticky", top: 75 }}
					>
						<div className="buy-stock-div1">
							<div className="buy-stock-form">
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
											onChange={(e) => {
												setShare(e.target.value);
											}}
											spellCheck="false"
											placeholder="0"
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
										$
										{share * stock.latestPrice > 0
											? (share * stock.latestPrice).toFixed(2)
											: "0".toLocaleString("en")}{" "}
									</span>
								</div>
								{showSell ? (
									<div>
										<button
											id="transaction-button"
											disabled={!share}
											className="reviewOrder"
											onClick={sellStock}
										>
											Complete Order
										</button>
									</div>
								) : (
									<div>
										<button
											id="transaction-button"
											disabled={!share}
											className="reviewOrder"
											onClick={purchaseStock}
										>
											Complete Order
										</button>
									</div>
								)}

								{showSell ? (
									<div>
										<span className="InvestLabel il5">
											{stock["shares_owned"] !== "null"
												? stock["shares_owned"]
												: 0}{" "}
											Share(s) Owned
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
								<div
									style={{
										maxWidth: 240,
										color: "black",
										fontWeight: 900,
										fontSize: 15,
										textAlign: "center",
									}}
								>
									{errors.length ? (
										<>
											<div
												style={{
													display: "flex",
													justifyContent: "flex-start",
													paddingBottom: 10,
												}}
											>
												<i className="fas fa-exclamation-circle"> Error</i>
											</div>
											{errors.map((error, ind) => (
												<div style={{ textAlign: "left" }} key={ind}>
													{error}
												</div>
											))}
										</>
									) : null}
									{transResult ? (
										<div style={{ textAlign: "left" }}>
											<div style={{ paddingBottom: 10, fontWeight: 900 }}>
												<i
													className="far fa-check-circle"
													style={{ color: "#00a806" }}
												>
													{" "}
													Success
												</i>
											</div>
											{transResult}
										</div>
									) : null}
								</div>
							</div>
						</div>
						<button onClick={() => setShow(true)} className="addTolist">
							Add to Watchlist
						</button>
						<Modal
							title={`Add ${stock["symbol"]} to a Watchlist`}
							show={show}
							onClose={() => setShow(false)}
						>
							<>
								<StockList assetID={stockId} assetSymbol={stock["symbol"]} />
							</>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Stock;
