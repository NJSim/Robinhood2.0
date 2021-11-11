import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useState, useEffect } from "react";
import Chart from "../Stocks/Chart";
export function Card({ title, itemId }) {
  const visibility = React.useContext(VisibilityContext);
  const stock = useSelector(state => state.stocks.stock);
  const visible = visibility.isItemVisible(itemId);
  const [chartPrice, setChartPrice] = useState();

  const childToParent = data => {
    setChartPrice(data);
  };
  if (stock) {
    return (
      <div
        role="button"
        style={{
          border: "1px solid",
          display: "inline-block",
          margin: "0 10px",
          width: "160px",
          userSelect: "none",
          marginBottom: "60px",
        }}
        tabIndex={0}
        className="card"
      >
        <div>
          <div>{stock["companyName"]}</div>
          <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
            change: {`${(stock["changePercent"] * 100).toFixed(2)}%`}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            height: "50px",
            color: "green",
          }}
        >
          price: {stock["latestPrice"]}
        </div>
        <Chart
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
        />
      </div>
    );
  }
}
