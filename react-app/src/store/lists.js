
const LOAD_LIST = 'lists/LOAD'

const initialState = {
    lists: null,
}
const loadWatchlists = (watchlists) => ({
    type: LOAD_LIST,
    payload: watchlists,
})

export const getList = () => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/watchlists`);

    if (response.ok) {
        const lists = await response.json();
        console.log(lists);
        dispatch(loadWatchlists(lists))
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
            return{ watchlist: action.payload }
        default:
            return state;
    }
}
