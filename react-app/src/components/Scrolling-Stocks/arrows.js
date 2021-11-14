import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import rImage from "./grey-arrow.png";
import lImage from "./left-grey-arrow.png";

function Arrow({ children, disabled, onClick, image }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        height: "71.5px",
        width: "39px",
        border: "none",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      {children}
    </button>
  );
}

// export function LeftArrow() {
//   const {
//     isFirstItemVisible,
//     scrollPrev,
//     visibleItemsWithoutSeparators,
//     initComplete,
//   } = React.useContext(VisibilityContext);

//   const [disabled, setDisabled] = React.useState(
//     !initComplete || (initComplete && isFirstItemVisible)
//   );
//   React.useEffect(() => {
//     if (visibleItemsWithoutSeparators.length) {
//       setDisabled(isFirstItemVisible);
//     }
//   }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

//   return (
//     <Arrow
//       disabled={disabled}
//       onClick={() => scrollPrev()}
//       image={lImage}
//     ></Arrow>
//   );
// }

// export function RightArrow() {
//   const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
//     React.useContext(VisibilityContext);

//   setInterval(() => {
//     scrollNext();
//   }, 500);

//   const [disabled, setDisabled] = React.useState(
//     !visibleItemsWithoutSeparators.length && isLastItemVisible
//   );
//   React.useEffect(() => {
//     if (visibleItemsWithoutSeparators.length) {
//       setDisabled(isLastItemVisible);
//     }
//   }, [isLastItemVisible, visibleItemsWithoutSeparators]);

//   return (
//     <Arrow
//       disabled={disabled}
//       onClick={() => scrollNext()}
//       image={rImage}
//     ></Arrow>
//   );
// }

let intervalTicker = 0;
let rightFinished = false;

export function LeftArrow() {
  const {
    // getItemById,
    getPrevItem,
    isFirstItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  React.useEffect(() => {
    if (intervalTicker >= 23) {
      const secondInterval = setInterval(() => {
        clickHandler();
        intervalTicker++;
        if (intervalTicker >= 47) {
          clearInterval(secondInterval);
          intervalTicker = 0;
          rightFinished = false;
        }
      }, 3000);
    }
  }, [rightFinished]);

  // React.useEffect(() => {
  //   if (!first) {
  //     const firstInterval = setInterval(() => {
  //       clickHandler();
  //       intervalTicker++;
  //       if (intervalTicker > 30) clearInterval(firstInterval);
  //     }, 3000);
  //     first++;
  //   }
  // }, []);

  const clickHandler = () => {
    const prevItem = getPrevItem();
    scrollToItem(prevItem?.entry?.target, "smooth", "start");
    // OR
    // scrollToItem(
    //   getItemById(visibleItemsWithoutSeparators.slice(-2)[0]),
    //   "smooth",
    //   "end"
    // );
  };

  return (
    <Arrow disabled={disabled} onClick={clickHandler} image={lImage}></Arrow>
  );
}

export function RightArrow() {
  const {
    getItemById,
    getNextItem,
    isLastItemVisible,
    scrollToItem,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );

  console.log(intervalTicker);
  // if (intervalTicker > 3) clearInterval(firstInterval);
  let first;
  React.useEffect(() => {
    if (!first) {
      const firstInterval = setInterval(() => {
        clickHandler();
        intervalTicker++;
        if (intervalTicker > 22) {
          clearInterval(firstInterval);
          rightFinished = true;
        }
      }, 3000);
      first++;
    }
  }, [rightFinished]);

  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  const clickHandler = () => {
    const nextItem = getNextItem();
    scrollToItem(nextItem, "smooth", "end");
    // OR
    // scrollToItem(
    //   getItemById(visibleItemsWithoutSeparators[1]),
    //   "smooth",
    //   "start"
    // );
  };

  return (
    <Arrow disabled={disabled} onClick={clickHandler} image={rImage}></Arrow>
  );
}
