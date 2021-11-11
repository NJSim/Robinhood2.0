const LOAD_STOCK = "stocks/LOAD_STOCK";
const LOAD_STOCK_NEWS = "stocks/LOAD_STOCK_NEWS";
const LOAD_ALL_STOCK = "stocks/LOAD_ALL_STOCK";

const setStock = stock => ({
  type: LOAD_STOCK,
  payload: stock,
});

const setAllStock = allStocks => ({
  type: LOAD_ALL_STOCK,
  payload: allStocks,
});

const initialState = {
  stock: null,
};

export const getStock = stockId => async dispatch => {
  const response = await fetch(`/api/stocks/${stockId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setStock(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getAllStocks = () => async dispatch => {
  const response = await fetch(`/api/stocks/all`);

  if (response.ok) {
    const data = await response.json();
    await dispatch(setAllStock(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCK:
      return { ...state, stock: action.payload };
    case LOAD_ALL_STOCK:
      return { ...state, allStocks: action.payload };
    default:
      return state;
  }
}
