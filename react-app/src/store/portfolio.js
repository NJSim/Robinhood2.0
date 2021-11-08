const UPDATE = "portfolios/UPDATE";
const LOAD = 'portfolios/LOAD'

const initialState = {
	portfolio: null,
};

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

export default function reducer(state = initialState, action) {
	switch (action.type) {

		default:
			return state;
	}
}
