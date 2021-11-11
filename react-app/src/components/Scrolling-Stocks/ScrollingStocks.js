import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStocks } from "../../store/stocks";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import loadingSpinner from "../../images/green-loading-spinner.gif";

const elemPrefix = "test";
const getId = index => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

let allStocks;
function ScrollingStock() {
  const stocks = useSelector(state => state.stocks.allStocks);
  console.log("All stocks======>", stocks);
  const [items] = React.useState(getItems);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!stocks) {
      return (
        <div id="loading">
          <img src={loadingSpinner} alt="Loading..." />
        </div>
      );
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllStocks());
    })();
  }, [dispatch]);

  if (stocks) {
    allStocks = Object.entries(stocks);
    console.log("All Stocks entries===>>>", allStocks);
  }

  let routeId = 0;

  return (
    <>
      <div style={{ marginRight: "50px", marginLeft: "50px" }}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          // onWheel={onWheel}
        >
          {allStocks ? (
            allStocks.map((stock, i) => (
              <Card
                title={stock[0]}
                stock={stock}
                itemId={stock[0]} // NOTE: itemId is required for track items
                key={stock[0]}
                routeId={i + 1}
              />
            ))
          ) : (
            <div id="loading">
              <img src={loadingSpinner} alt="Loading..." />
            </div>
          )}
        </ScrollMenu>
      </div>
    </>
  );
}

//   return (
//     <div id="loading">
//       <img src={loadingSpinner} alt="Loading..." />
//     </div>
//   );
// }

export default ScrollingStock;
