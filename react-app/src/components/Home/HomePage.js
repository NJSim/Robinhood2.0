import "./HomePage.css";
import Footer from "../Footer/Footer";
import List from "../Lists/List";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../store/portfolio";
import { getStock } from "../../store/stocks";
import { MechanicalCounter } from "mechanical-counter";
import Chart from "../Stocks/Chart";
import { deleteList } from "../../store/lists";
import loadingSpinner from "../../images/green-loading-spinner.gif";
import ScrollingStock from "../Scrolling-Stocks/ScrollingStocks";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const portfolio = useSelector(state => state.portfolio.portfolio);
  const stock = useSelector(state => state.stocks.stock);
  const [mainStock, setMainStock] = useState(23);
  const [chartPrice, setChartPrice] = useState();

  function numberWithCommas(x) {
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let assets;
  if (portfolio) {
    assets = Object.values(portfolio.positions);
    // setMainStock(assets[0].asset_id);
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    if (sessionUser) {
      await dispatch(getPortfolio());
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    (async () => {
      if (sessionUser) {
        await dispatch(getPortfolio());
        setLoaded(true);
      } else {
        setLoaded(true);
      }
    })();
  }, [dispatch, sessionUser]);

  useEffect(async () => {
    if (sessionUser) {
      await dispatch(getStock(mainStock));
    }
  }, [dispatch, sessionUser, mainStock]);

  const trendingListsTest = [
    { id: 1, name: "Tech" },
    { id: 2, name: "Crypto" },
    { id: 3, name: "IPO" },
  ];

  const childToParent = data => {
    setChartPrice(data);
  };

  if (!sessionUser) {
    return (
      <div id="loading">
        <img src={loadingSpinner} alt="Loading..." />
      </div>
    );
  }
  if (!sessionUser) {
    return (
      <>
        <div className="HomePageContainer">
          {/* HomePage container */}
          <div className="HomePageItem1">
            <div className="HomeLeftContainer">
              <div>
                <h1 className="HomeH1">Investing for Everyone </h1>
              </div>
              <div>
                <span className="HomeSpanText">
                  Commission-free investing, plus the tools you need to put your
                  money in motion. Sign up and get your first stock for free.
                  Certain limitations and fees apply.{" "}
                </span>
              </div>
              <button className="SignUpHomeButton">
                <a href="/signUp" className="homeSignUpText">
                  Sign Up{" "}
                </a>
              </button>
              <h3 className="HomeH3">
                <img
                  src="https://img.icons8.com/ios/50/000000/info--v1.png"
                  alt=""
                  width="30"
                  height="30"
                  className="circle"
                />{" "}
                Commissions and Free Stock Disclosures
              </h3>
            </div>
          </div>
          <div className="HomePageItem2">
            <img
              src={
                "https://robinhood.com/us/en/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png"
              }
              alt=""
              className="robinpic1"
            ></img>
            <img
              src={
                "https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"
              }
              alt=""
              className="robinpic2"
            ></img>
          </div>
        </div>

        <div className="HomePageContainer2">
          <div className="HomePage2Item1">
            <span className="container2Span">
              See our fee schedule to learn more about cost.
            </span>
          </div>
        </div>

        <div className="HomePageContainer3">
          <div className="HomePage3Item1">
            <img
              src={
                "https://robinhood.com/us/en/_next/static/images/balloon__ef7d8a9bb1c7845fcb7a6799c35d513e.svg"
              }
              alt=""
              className="robinpic3"
            ></img>
          </div>
          <div className="HomePage3Item2">
            <div>
              <h2 className="hp31">Introducing IPO Access</h2>
              <span className="hp32">
                Get in at the IPO price. Now, you can become one of the first
                public investors in upcoming IPOs.
              </span>
            </div>
            <div>
              <img
                className="hpI"
                src={
                  "https://robinhood.com/us/en/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg"
                }
                alt=""
              ></img>
              <span className="h1s1">It's your turn</span>
              <p className="h1p1">
                No minimum account balances or special status requirements.
              </p>
            </div>
            <div>
              <img
                className="hpI"
                src={
                  "https://robinhood.com/us/en/_next/static/images/one-first__d86b9ee63a8475364159f2d21ea5f01f.svg"
                }
                alt=""
              ></img>
              <span className="h1s1">Be one of the first</span>
              <p className="h1p1">
                Request shares in new companies before their stock starts
                trading on public exchanges.
              </p>
            </div>
            <div>
              <img
                className="hpI"
                src={
                  "https://robinhood.com/us/en/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg"
                }
                alt=""
              ></img>
              <span className="h1s1">Get a fair shot</span>
              <p className="h1p1">
                While IPO shares are limited, IPO Access gives you the same
                opportunity to invest, regardless of order size or account
                value.
              </p>
            </div>
            <span className="IPO">
              {" "}
              <img
                src="https://img.icons8.com/ios/50/000000/info--v1.png"
                alt=""
                width="30"
                height="30"
                className="circle2"
              />
              IPO Access disclosure
            </span>
          </div>
        </div>

        <div className="HomePageContainer4">
          <div className="hp41">
            <div className="hp411">
              <span className="hp411Span"> Introducing Fractional Shares </span>
              <span className="hp412Span">
                {" "}
                Invest in thousands of stocks with as little as $1.{" "}
              </span>
            </div>
            <div className="hp412">
              <div className="hp41one">
                <span className="hp413Span">Invest Any Amount</span>
                <span className="hp414Span">
                  Choose how much you want to invest, and we’ll convert from
                  dollars to parts of a whole share.
                </span>
              </div>
              <div className="hp41two">
                <span className="hp413Span">Build a Balanced Portfolio</span>
                <span className="hp414Span">
                  Customize your portfolio with pieces of different companies
                  and funds to help reduce risk.
                </span>
              </div>
              <div className="hp41three">
                <span className="hp413Span">Trade in Real Time</span>
                <span className="hp414Span">
                  Trades placed during market hours are executed at that time,
                  so you’ll always know the share price.
                </span>
              </div>
            </div>
            <span className="IPO a12">
              {" "}
              <img
                src="https://img.icons8.com/ios/50/000000/info--v1.png"
                alt=""
                width="30"
                height="30"
                className="circle2"
              />
              Fractional Shares Disclosure
            </span>
          </div>

          <div className="hp42">
            <img
              className="hpI2"
              src={
                "https://robinhood.com/us/en/_next/static/images/3x__e61985cb13c119a29374ade4e7a49a47.png"
              }
              alt=""
            ></img>
          </div>
        </div>

        <Footer />
      </>
    );
  }
  if (!stock) {
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
          <div style={{ marginTop: "50px" }}>
            <ScrollingStock style={{ height: "30px" }} />
          </div>

          <div className="dashboardContainer">
            <div className="row">
              <div className="mainContainer">
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
                        ? chartPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                    ? "(" + "+" + stock["changePercent"].toFixed(3) + "%) "
                    : "(" + stock["changePercent"].toFixed(3) + "%) "}
                  <span style={{ fontWeight: 0, color: "#697277" }}>Today</span>
                </h4>
                {stock ? (
                  <Chart
                    childToParent={childToParent}
                    timeFrame={"chart_1d"}
                    stock={stock}
                    stockName={stock["companyName"]}
                    color={"#00a806"}
                  />
                ) : (
                  "something's not right!"
                )}
              </div>

              <div className="listsContainer">
                <List assetID={stock["id"]} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {portfolio ? (
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
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={loadingSpinner} alt="Loading..." />
        </div>
      )}

      {/* <div id="ticker-headings">
          <h1>
            This is where we will put the total portfolio balance and daily
            percent change
          </h1>
        </div> */}
      <div>
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
              : "Loading assets..."}
          </tbody>
        </table>
        {/* <div id="portfolio-table-heading">
            <p>symbol</p>
            <p>shares</p>
            <p>values</p>
            <p>todays return</p>
            <p>return</p>
            <p>return with sells</p>
            <p>price/share</p>
            <p>sell</p>
          </div> */}
      </div>
      {/* <div>
          {assets
            ? assets.map(asset => (
                <tr
                  onClick={e => setMainStock(asset.asset_id)}
                  key={asset.asset_id}
                  id="portfolio-asset"
                >
                  <td>{asset.symbol}</td>
                  <td>{asset.total_shares}</td>
                  <td>{asset.current_stock_price}</td>
                  <td>todays return</td>
                  <td>{asset["profit/loss"]}</td>
                  <td>{asset["profit/loss"]}</td>
                  <td>{asset.avg_purchase_price}</td>
                  <td>sell</td>
                </tr>
              ))
            : "something not workind"}
        </div> */}
    </>
  );
}

export default HomePage;
