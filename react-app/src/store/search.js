const LOAD_SEARCH = 'SEARCH/LOAD'

const initialState = {
    results: null,
}

const loadSearch = (query) => ({
    type: LOAD_SEARCH,
    payload: query
})

export const getQuery = (query) => async(dispatch) => {
    const response = await fetch (`/api/stocks/query/${query}`);

    if (response.ok) {
        const results = await response.json();
        console.log(results);
        dispatch(loadSearch(results))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SEARCH:
            return{ query: action.payload }
        default:
            return state;
    }
}
