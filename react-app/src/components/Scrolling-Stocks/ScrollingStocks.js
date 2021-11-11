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

function ScrollingStock() {
  const stocks = useSelector(state => state.stocks.allStocks);
  console.log("All stocks======>", stocks);
  const [items] = React.useState(getItems);

  const dispatch = useDispatch();
  let allStocks;
  useEffect(() => {
    // if (!stocks) {
    //   return (
    //     <div id="loading">
    //       <img src={loadingSpinner} alt="Loading..." />
    //     </div>
    //   );
    // }
    (async () => {
      await dispatch(getAllStocks());
    })();
    // allStocks = Object.entries(stocks);
  }, [dispatch]);

  if (allStocks) {
    let allStocks = Object.values(stocks);
    let allSymbols = Object.keys(stocks);
    return (
      <>
        <div style={{ marginRight: "50px", marginLeft: "50px" }}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            // onWheel={onWheel}
          >
            {allStocks.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </>
    );
  }

  return (
    <div id="loading">
      <img src={loadingSpinner} alt="Loading..." />
    </div>
  );
}

export default ScrollingStock;
