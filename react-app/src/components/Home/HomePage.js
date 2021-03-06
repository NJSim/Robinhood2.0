import "./HomePage.css";
import List from "../Lists/List";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../store/portfolio";
import { getStock } from "../../store/stocks";
import { MechanicalCounter } from "mechanical-counter";
import Chart from "../Stocks/Chart";
import loadingSpinner from "../../images/green-loading-spinner.gif";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const portfolio = useSelector(state => state.portfolio.portfolio);
  const stock = useSelector(state => state.stocks.stock);

  let emptyPortfolio;
  let assets;
  if (portfolio["isEmpty"]) {
    emptyPortfolio = true;
  } else {
    assets = Object.values(portfolio.positions);
  }
  const [mainStock, setMainStock] = useState("");
  const [chartPrice, setChartPrice] = useState();

  function numberWithCommas(x) {
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    let stock;
    if(sessionUser){
      await dispatch(getPortfolio())
        .then(() => {
          setLoaded(true);
          if (portfolio["isEmpty"]) {
            stock = 1;
          }else {
            stock = assets[0].asset_id;
          }
        })
        .then(() => dispatch(getStock(stock)));
      }
  }, [dispatch, sessionUser]);

  useEffect(async() => {
    if (mainStock){
      await dispatch(getStock(mainStock))
    }
  }, [dispatch, mainStock])

  const childToParent = data => {
    setChartPrice(data);
  };

  if (!stock || !loaded) {
    return (
      <div id="loading">
        <img src={loadingSpinner} alt="Loading..." />
      </div>
    );
  }
  return (
    <>
      <div className="flex1">
        <div className="flex2">
          <div className="dashboardContainer">
            <div className="row">
              <div className="mainContainer">
                <h1>{!emptyPortfolio?stock["companyName"]:`${sessionUser.name}, Welcome ToTheMoon.`}</h1>
                {emptyPortfolio?(<h2>Purchase some shares to get started.</h2>):null}
               {!emptyPortfolio?(<div
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
                        ? chartPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : stock["latestPrice"]
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </div>):null}

               {!emptyPortfolio?(<h4 id="stock-change">
                  {stock["change"] > 0
                    ? "+$" + stock["change"] + " "
                    : "$" + stock["change"] + " "}
                  {stock["changePercent"] > 0
                    ? "(" + "+" + stock["changePercent"].toFixed(3) + "%) "
                    : "(" + stock["changePercent"].toFixed(3) + "%) "}
                  <span style={{ fontWeight: 0, color: "#697277" }}>Today</span>
                </h4>):null}
                {!emptyPortfolio ? (
                  <Chart
                    childToParent={childToParent}
                    timeFrame={"chart_1d"}
                    stock={stock}
                    stockName={stock["companyName"]}
                    color={"#00a806"}
                    height={250}
                  />
                ) : (
                  <div style={{paddingTop:30}}>
                    <img src="https://cdn.robinhood.com/assets/generated_assets/6da8e43c2ce2585fa5f4384a506a5eda.svg" width="700"/>
                    </div>
                )}
              </div>

              <div className="listsContainer">
                <List assetID={stock["id"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!portfolio["isEmpty"] ? (
        <table id="portfolio-ticker">
          <thead>
            <tr id="ticker-headings">
              <th className="ticker-headings-ele">Total Value</th>
              <th className="ticker-headings-ele">Change Today</th>
              <th className="ticker-headings-ele">Buying Power</th>
            </tr>
          </thead>
          <tbody>
            <tr className="ticker-number">
              <td className="ticker-number">{`$${numberWithCommas(
                +sessionUser.buying_pwr + +portfolio.totalMarketValue
              )}`}</td>
              {+portfolio["overallProfit/Loss"] > 0 ? (
                <td
                  className="ticker-number"
                  style={{ color: "#00a806" }}
                >{`$${+portfolio["overallProfit/Loss"].toFixed(
                  2
                )} (${numberWithCommas(
                  100 *
                    (
                      +portfolio["overallProfit/Loss"] /
                      (+sessionUser.buying_pwr + +portfolio.totalMarketValue)
                    ).toFixed(3)
                )}%)`}</td>
              ) : (
                <td
                  className="ticker-number"
                  style={{ color: "red" }}
                >{`-$${Math.abs(
                  +portfolio["overallProfit/Loss"].toFixed(2)
                )} (${numberWithCommas(
                  100 *
                    (
                      +portfolio["overallProfit/Loss"] /
                      (+sessionUser.buying_pwr + +portfolio.totalMarketValue)
                    ).toFixed(3)
                )}%)`}</td>
              )}

              <td className="ticker-number">
                {`$${numberWithCommas(+sessionUser.buying_pwr)}`}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      <div id="portfolio-table-container" style={{paddingBottom: 20}}>
        <table id="portfolio-table-heading">
          <thead id="table-row-head">
            <tr>
              <th className="portfolio-table-heading-ele">Symbol</th>
              <th className="portfolio-table-heading-ele">Shares</th>
              <th className="portfolio-table-heading-ele">Current price</th>
              <th className="portfolio-table-heading-ele">
                Average purchase price
              </th>
              <th className="portfolio-table-heading-ele">ROI/Share</th>
              <th className="portfolio-table-heading-ele">Profit/Loss</th>
              <th className="portfolio-table-heading-ele">Market value</th>
            </tr>
          </thead>
          <tbody>
            {assets
              ? assets.map(asset => (
                  <tr
                    id="table-row-pointer"
                    onClick={e => setMainStock(asset.asset_id)}
                    key={asset.asset_id}
                  >
                    <td id="asset-symbol" className="table-row-ele">
                      {asset.symbol}
                    </td>
                    <td className="table-row-ele">{asset.total_shares}</td>
                    <td className="table-row-ele">
                      {`$${numberWithCommas(asset.current_stock_price)}`}
                    </td>
                    <td className="table-row-ele">{`$${numberWithCommas(
                      asset.avg_purchase_price
                    )}`}</td>
                    {asset.current_stock_price - asset.avg_purchase_price >
                    0 ? (
                      <td
                        className="table-row-ele"
                        style={{ color: "#00a806" }}
                      >
                        {`$${(
                          asset.current_stock_price - asset.avg_purchase_price
                        ).toFixed(2)} (${(
                          (100 *
                            (asset.current_stock_price -
                              asset.avg_purchase_price)) /
                          asset.avg_purchase_price
                        ).toFixed(2)}%)`}
                      </td>
                    ) : (
                      <td className="table-row-ele" style={{ color: "red" }}>
                        {`-$${Math.abs(
                          asset.current_stock_price - asset.avg_purchase_price
                        ).toFixed(2)}  (${(
                          (100 *
                            (asset.current_stock_price -
                              asset.avg_purchase_price)) /
                          asset.avg_purchase_price
                        ).toFixed(2)}%)`}
                      </td>
                    )}

                    {asset["profit/loss"] > 0 ? (
                      <td
                        className="table-row-ele"
                        style={{ color: "#00a806" }}
                      >
                        {`$${asset["profit/loss"].toFixed(
                          2
                        )} (${numberWithCommas(
                          100 * (+asset["profit/loss"] / +asset.market_value)
                        )}%)`}
                      </td>
                    ) : (
                      <td className="table-row-ele" style={{ color: "red" }}>
                        {`-$${Math.abs(
                          asset["profit/loss"].toFixed(2)
                        )}  (${numberWithCommas(
                          100 * (+asset["profit/loss"] / +asset.market_value)
                        )}%)`}
                      </td>
                    )}
                    <td className="table-row-ele">
                      {`$${numberWithCommas(asset.market_value)}`}
                    </td>
                  </tr>
                ))
              : "Your portfolio is empty."}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomePage;
