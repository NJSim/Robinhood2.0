import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getStock } from "../../store/stocks";
import { authenticate } from "../../store/session";
import StockNews from "./StockNews";

import "./Stock.css";
import Chart from "./Chart";
import loadingSpinner from "../Stocks/green-loading-spinner.gif";
import { executeTransaction } from "../../store/transactions";

function Stock() {

	const { stockId } = useParams();
	const stock = useSelector((state) => state.stocks.stock);
	const userId = useSelector((state) => state.session.user.id);

	const [timeFrame, setTimeFrame] = useState("chart_1d");
	const dispatch = useDispatch();

	// working on
	const user = useSelector((state) => state.session.user);
	const [share, setShare] = useState();
	const [showSell, setShowSell] = useState(false);
	const [showBuy, setShowBuy] = useState(true);
	const [errors, setErrors] = useState([]);

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
    if (trans.errors){
      setErrors(trans.errors)
    } else {
      setErrors([]);

    }
    dispatch(authenticate())
    dispatch(getStock(stockId));
	};
  const sellStock = async () => {
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
			setErrors([]);
		}
		dispatch(authenticate());
    dispatch(getStock(stockId));
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
										maxlength="8"
										className="buyInput"
										type="integer"
										required
										value={share}
										onChange={(e) => {
											setShare(e.target.value);
										}}
										spellcheck="false"
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
										? share * stock.latestPrice
										: "0".toLocaleString("en")}{" "}
								</span>
							</div>
							{showSell ? (
								<div>
									<button
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
										disabled={!share}
										className="reviewOrder"
										onClick={purchaseStock}
									>
										Complete Order
									</button>
								</div>
							)}
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							{showSell ? (
								<div>
									<span className="InvestLabel il5">{stock['shares_owned'] !== 'null'?stock['shares_owned']:0} Share(s) Owned</span>
								</div>
							) : (
								<div>
									<span className="InvestLabel il5">
										${user["buying_pwr"].toLocaleString("en")} buying power
										available
									</span>
								</div>
							)}
						</div>
					</div>
					<div>
						<button className="addTolist">Add to Lists</button>
					</div>
				</div>
			</div>
			<Chart
				timeFrame={timeFrame}
				stock={stock[timeFrame]}
				stockName={stock["companyName"]}
				color={"#00a806"}
			/>
			<div id="timeFrameDiv">
				<button
					className="timeFrameButton"
					onClick={(e) => setTimeFrame("chart_1d")}
				>
					daily
				</button>
				<button
					className="timeFrameButton"
					onClick={(e) => setTimeFrame("chart_1m")}
				>
					monthly
				</button>
				<button
					className="timeFrameButton"
					onClick={(e) => setTimeFrame("chart_1y")}
				>
					yearly
				</button>
			</div>
			<div id="news-container">
				<h1 style={{ textAlign: "center", marginBottom: "50px" }}>
					Recent News
				</h1>
				{stock["news"].map((article) => {
					return <StockNews key={article.id} news={article} />;
				})}
			</div>
		</div>
	);

}
export default Stock;
