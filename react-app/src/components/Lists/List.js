
import "./List.css"

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList, editList, deleteList, addWatchList, addToWatchlist } from "../../store/lists";


function List({assetID}){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [newEditName, setNewEditName] = useState("");
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

        dispatch(addToWatchlist(mainWatchlist, assetID)).then(() => dispatch(getList(sessionUser.id)))
    }

    // const testLists = [{"id": 1, "name": "First List", "user_id": 1},{"id": 2, "name": "Second List", "user_id": 1}]
    if (!watchlists){
        return null
    }

    const submitDeleteWatchlist = async(e) => {
        e.preventDefault()
        dispatch(deleteList(mainWatchlist)).then(() => dispatch(getList(sessionUser.id)))
    }

    const submitEditWatchlist = async(e) => {
        e.preventDefault()
        dispatch(editList(mainWatchlist, newEditName, sessionUser.id)).then(() => dispatch(getList(sessionUser.id)))

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

            <button onClick={submitDeleteWatchlist}>Delete List</button>
            <button onClick={submitAddAsset}>Add to List</button>
            <button>Edit List</button>


            {Object.keys(watchlists).map( (key, index) => (
                <div className="edit-form">
                <h2 onClick={(e) => setMainWatchlist(watchlists[key].id)}key={watchlists[key].id}>{watchlists[key].name}</h2>
                    <div className="invisible-list">
                        <input onChange={(e) => setNewEditName(e.target.value)} className="edit-list" placeholder={watchlists[key].name}></input>
                        <button onClick={submitEditWatchlist} className="submit-edit-list">Submit</button>
                    </div>
                <button onClick={(e) => setMainWatchlist(watchlists[key].id)}key={watchlists[key].id} className="open-edit-input"> ... </button>
                </div>
            ))}

        </div>
    )
}
}

export default List;
