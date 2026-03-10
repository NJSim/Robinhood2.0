import { updatePortfolio } from "./portfolio";

const LOAD_HISTORY = "transactions/LOAD_HISTORY";


const initialState = {
	history: {}
};
const loadHistory = (history) => ({
	type: LOAD_HISTORY,
	payload: history,
});

export const executeTransaction = (transaction) => async (dispatch) => {
	const response = await fetch(`/api/transactions/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });

	if (response.ok) {
		const newTransaction = await response.json();
		dispatch(updatePortfolio(newTransaction.id, newTransaction.user_id))
        return newTransaction
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};
export const transactionHistory = (userId) => async (dispatch) => {
	const response = await fetch(`/api/transactions/${userId}`);

	if (response.ok) {
		const history = await response.json();
		dispatch(loadHistory(history));
		return history;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_HISTORY:
			return{
				history: action.payload
			}
		default:
			return state;
	}
}
