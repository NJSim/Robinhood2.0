
import "./List.css"

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList, updateList, deleteList, addWatchList, addToWatchlist } from "../../store/lists";


function List({assetID}){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [mainWatchlist, setMainWatchlist] = useState("");

    const [newWatchlist, setNewWatchlist] = useState("");

    useEffect(() => {
        if(sessionUser){
            dispatch(getList(sessionUser.id))
        }
    },[dispatch, sessionUser, mainWatchlist])


    const submitWatchlist = async(e) => {
        e.preventDefault();
        if(!sessionUser) return;

    //    const res = await dispatch(addWatchList(newWatchlist, sessionUser.id))
    //    if(res) await dispatch(getList(sessionUser.id))
        dispatch(addWatchList(newWatchlist, sessionUser.id)).then(() => dispatch(getList(sessionUser.id)))
    }

    const submitAddAsset = async(e) => {
        e.preventDefault()

        dispatch(addToWatchlist(mainWatchlist, assetID))
    }

    // const testLists = [{"id": 1, "name": "First List", "user_id": 1},{"id": 2, "name": "Second List", "user_id": 1}]
    if (!watchlists){
        return null
    }

    const submitDeleteWatchlist = async(e) => {
        e.preventDefault()
        dispatch(deleteList(mainWatchlist))
    }




    if (sessionUser && watchlists) {
    return(
        <div className="allLists">
            <form onSubmit={submitWatchlist}>
                <input
                    value={newWatchlist}
                    onChange={(e) => setNewWatchlist(e.target.value)}
                    required
                    placeholder='Create New Watchlist'
                >

                </input>
                <button type="submit">Create List</button>
            </form>

            <button onClick={submitDeleteWatchlist} >Delete List</button>
            <button onClick={submitAddAsset}>Add to List</button>
            <button>Edit List</button>


            {Object.keys(watchlists).map( (key, index) => (
                <>
                <h2 onClick={(e) => setMainWatchlist(watchlists[key].id)}key={watchlists[key].id}>{watchlists[key].name}

                </h2>

                </>
            ))}

        </div>
    )
}
}

export default List;
