const LOAD_STOCK = "session/LOAD_STOCK";

const setStock= (stock) => ({
	type: LOAD_STOCK,
	payload: stock,
});

const initialState = { stock: null };

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
