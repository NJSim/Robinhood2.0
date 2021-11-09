import { updatePortfolio } from "./portfolio";

const EXECUTE = "transactions/EXECUTE";


const initialState = {
	transactions: null
};

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
