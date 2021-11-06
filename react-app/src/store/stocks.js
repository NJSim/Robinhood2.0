const LOAD_STOCK = "stocks/LOAD_STOCK";
const LOAD_STOCK_NEWS = "stocks/LOAD_STOCK_NEWS"

const setStock = (stock) => ({
	type: LOAD_STOCK,
	payload: stock,
});
const loadStockNews = (stock_news) => ({
	type: LOAD_STOCK_NEWS,
	payload: stock_news,
});

const initialState = {
     stock: null,
     stock_news: null
 };

export const getStock = (stockId) => async (dispatch) => {
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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_STOCK:
			return { stock: action.payload };
		default:
			return state;
	}
}
