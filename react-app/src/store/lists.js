
const LOAD_LIST = 'lists/LOAD'

const initialState = {
    watchlists: null,
}
const loadWatchlists = (watchlists) => ({
    type: LOAD_LIST,
    payload: watchlists,
})

export const getList = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/watchlists`);

    if (response.ok) {
        const watchlists = await response.json();
        console.log(watchlists);
        dispatch(loadWatchlists(watchlists))
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

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return{ watchlists: action.payload }
        default:
            return state;
    }
}
