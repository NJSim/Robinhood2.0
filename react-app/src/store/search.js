const LOAD_SEARCH = 'SEARCH/LOAD'
const CLEAR_SEARCH = 'SEARCH/CLEAR'

const initialState = {
    results: {},
}

const loadSearch = (query) => ({
    type: LOAD_SEARCH,
    payload: query
})

const clearSearch = () => ({
    type: CLEAR_SEARCH
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

export const clearQuery = () => async(dispatch) => {
    dispatch(clearSearch())
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SEARCH:
            return{ results: action.payload }
        case CLEAR_SEARCH:
            return{ results: {}}

        default:
            return state;
    }
}
