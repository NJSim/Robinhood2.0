
const LOAD_LIST = 'lists/LOAD'


const initialState = {
    watchlists: null,
}

const loadWatchlists = (watchlists) => ({
    type: LOAD_LIST,
    payload: watchlists,
})

// get a watchlists
export const getList = (userId) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/${userId}`);

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

//edit a watchlist
const EDIT_LIST = 'lists/EDIT'


const updateList = (watchlists) => ({
    type: EDIT_LIST,
    payload: watchlists
});

export const editList = (id, userId, payload) => async(dispatch) => {
    const res = await fetch(`/api/watchlists/${id}/edit`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: userId, payload})
    });

    const data = await res.json()
    dispatch(updateList(data))

}
//delete a watchlist

export const deleteList = (id) => async(dispatch) => {
    const res = await fetch(`/api/watchlists/${id}/delete`,{
        method: "DELETE",
    });

    const data = await res.json();
    return data;
}

//create a watchlist
const ADD_LIST = 'lists/ADD'


const addToList = (watchlists) => ({
    type: ADD_LIST,
    payload: watchlists
});



export const addWatchList = (name, userId) => async dispatch => {
    const res = await fetch(`/api/watchlists/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({name, user_id: userId })
    })
}



//add assest to watch list

const ADD_TO_LIST = 'lists/ADD_TO_LIST'


const addAssestToList = (watchlists) => ({
    type: ADD_TO_LIST,
    payload: watchlists
});

export const addToWatchlist = (id, symbol) => async dispatch => {


    // for(let i = 0; i < idArray.length; i++){
    //     let id = idArray[i]

      const res = await fetch(`/api/watchlists/${id}/add`, {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({symbol})
    })
    if(res.ok){
        const data = await res.json()
        dispatch(addAssestToList(data))
      }

}

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return{ watchlists: action.payload }
        case EDIT_LIST:
            return{...state, watchlists: action.payload}
        case ADD_LIST:
            return{...state, watchlists: action.payload}
        case ADD_TO_LIST:
            return{...state, watchlists: action.payload}
        default:
            return state;
    }
}
