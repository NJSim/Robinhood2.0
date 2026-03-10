
const LOAD_PORTFOLIO = 'portfolios/LOAD'

const initialState = {
	portfolio: null,
};
const loadPortfolio = (portfolio) => ({
	type: LOAD_PORTFOLIO,
	payload: portfolio,
});
export const updatePortfolio = (transactionId, userId) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/update`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({transactionId, userId}),
	});

	if (response.ok) {
		return "Successful"
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getPortfolio = () => async (dispatch) => {
	const response = await fetch(`/api/portfolios/`);

	if (response.ok) {
		const portfolio = await response.json();
        dispatch(loadPortfolio(portfolio))
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
        case LOAD_PORTFOLIO:
            return{ portfolio: action.payload}
		default:
			return state;
	}
}
