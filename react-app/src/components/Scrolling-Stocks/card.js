import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useState, useEffect } from "react";
import Chart from "../Stocks/Chart";
export function Card({ title, stock, itemId, key, routeId }) {
  const visibility = React.useContext(VisibilityContext);
  // const stock = useSelector(state => state.stocks.stock);
  const visible = visibility.isItemVisible(itemId);
  const [chartPrice, setChartPrice] = useState();

  const childToParent = data => {
    setChartPrice(data);
  };
  if (stock) {
    return (
      <Link to={`/stocks/${routeId}`} style={{ color: "black" }}>
        <div
          role="button"
          style={{
            border: "1px solid",
            display: "inline-block",
            margin: "0 10px",
            width: "120px",
            userSelect: "none",
            marginBottom: "60px",
            cursor: "pointer",
          }}
          tabIndex={0}
          className="card"
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "10pt",
                height: "20px",
                textAlign: "center",
              }}
            >
              {stock[0]}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {`$${stock[1].quote["latestPrice"]}`}
          </div>
          {stock[1].quote["changePercent"] * 100 < 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              {`${(stock[1].quote["changePercent"] * 100).toFixed(2)}%`}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "green",
              }}
            >
              {`${(stock[1].quote["changePercent"] * 100).toFixed(2)}%`}
            </div>
          )}
          {/* <div
            style={{
              backgroundColor: "white",
              height: "15px",
              fontWeight: "1000",
              textAlign: "center",
              fontSize: "24pt",
            }}
          >
            {stock[0]}
          </div> */}
          {/* <Chart
            timeFrame={"chart_1d"}
            stock={stock}
            color={"#00a806"}
            childToParent={childToParent}
            height={100}
            width={150}
            style={{
                backgroundColor: "bisque",
                height: "100px",
                overflow: "scroll",
            }}
            /> */}
        </div>
      </Link>
    );
  }
}
