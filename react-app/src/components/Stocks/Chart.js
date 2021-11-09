import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";

const Chart = ({ timeFrame, stock, stockName, color }) => {
  let yValues = [];
  let xValues = [];

  if (timeFrame === "chart_1d") {
    let dummyPrice;
    let increase = 1;

    for (let i = 0; i < stock.length; i++) {
      const point = stock[i];
      if (point.average) {
        if (increase) {
          dummyPrice = point.average * 1.02;
          increase -= 1;
        } else {
          dummyPrice = point.average * 0.98;
          increase += 1;
        }
        yValues.push(point.average);
      }
      if (!point.average) {
        yValues.push(dummyPrice);
      }
      console.log(dummyPrice);
      console.log(increase);
    }

    xValues = stock.map(point => {
      return point.minute;
    });
  }

  if (timeFrame === "chart_1m" || timeFrame === "chart_1y") {
    let dummyPrice;
    let increase = 1;

    for (let i = 0; i < stock.length; i++) {
      const point = stock[i];
      if (point.uClose) {
        if (increase) {
          dummyPrice = point.uClose * 1.02;
          increase -= 1;
        } else {
          dummyPrice = point.uClose * 0.98;
          increase += 1;
        }
        yValues.push(point.uClose);
      }
      if (!point.uClose) {
        yValues.push(dummyPrice);
      }
    }

    xValues = stock.map(point => {
      return point.date;
    });

    yValues = stock.map(point => {
      return point.uClose;
    });
  }

  return (
    <Fragment>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "ohlc",
            mode: "lines+markers",
            marker: { color: color },
          }
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
