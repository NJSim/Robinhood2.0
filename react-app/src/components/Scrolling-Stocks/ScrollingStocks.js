import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStocks } from "../../store/stocks";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import loadingSpinner from "../../images/green-loading-spinner.gif";

let allStocks;
function ScrollingStock() {
  const stocks = useSelector(state => state.stocks.allStocks);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getAllStocks());
    })();
  }, [dispatch]);

  if (stocks) {
    allStocks = Object.entries(stocks);
    // allStocks = [
    //   ...allStocks,
    //   ...allStocks,
    //   ...allStocks,
    //   ...allStocks,
    //   ...allStocks,
    // ];
  }

  return (
    <>
      <div style={{ marginRight: "30px", marginLeft: "30px", height: "50px" }}>
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
            <div id="loadingSmall">
              <img
                src={loadingSpinner}
                alt="Loading..."
                width="50"
                height="50"
              />
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
