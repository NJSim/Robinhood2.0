import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";

const Chart = ({ timeFrame, stock, stockName, color }) => {
  let yValues = [];
  let xValues = [];

  function plotTimeFrame(price, time) {
    stock[timeFrame].forEach(point => {
      yValues.push(point[`${price}`]);
      xValues.push(point[`${time}`]);
    });
  }

  timeFrame === "chart_1d"
    ? plotTimeFrame("average", "minute")
    : plotTimeFrame("uClose", "date");

  return (
    <Fragment>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
            marker: { color: color },
          },
        ]}
        layout={{ width: 1220, height: 840, title: stockName }}
        options={{ displaylogo: "false" }}
      />
    </Fragment>
  );
};

Chart.propTypes = {
  stock: PropTypes.object.isRequired,
  stockName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
export default Chart;

// ****DO NOT DELETE******* below code should handle null values of stock price ****DO NOT DELETE*******

// function plotTimeFrame(price, time) {
//   let dummyPrice;
//   let increase = 1;
//   for (let i = 0; i < stock[timeFrame].length; i++) {
//     const point = stock[timeFrame][i];
//     if (point[`${price}`]) {
//       if (increase) {
//         dummyPrice = point[`${price}`] * 1.02;
//         increase -= 1;
//       } else {
//         dummyPrice = point[`${price}`] * 0.98;
//         increase += 1;
//       }
//       yValues.push(point[`${price}`]);
//       xValues.push(point[`${time}`]);
//     }
//     if (!point[`${price}`]) {
//       yValues.push(dummyPrice);
//     }
//   }
// }
