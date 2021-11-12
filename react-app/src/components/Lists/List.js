import "./List.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList, editList, deleteList, addWatchList, addToWatchlist } from "../../store/lists";
import SingleList from "./SingleList";

function List(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const watchlists = useSelector(state => state.watchlists.watchlists);

    const [showNewWatchlist, setShowNewWatchlist] = useState(false);
    const [mainWatchlist, setMainWatchlist] = useState("");

    const [newWatchlist, setNewWatchlist] = useState("");

    useEffect(() => {
        if(sessionUser){
            dispatch(getList(sessionUser.id))
        }
    },[dispatch, sessionUser, mainWatchlist])


    const submitWatchlist = async(e) => {
        e.preventDefault();
        setShowNewWatchlist(!showNewWatchlist)
        if(!sessionUser) return;

    //    const res = await dispatch(addWatchList(newWatchlist, sessionUser.id))
    //    if(res) await dispatch(getList(sessionUser.id))
        dispatch(addWatchList(newWatchlist, sessionUser.id)).then(() => dispatch(getList(sessionUser.id)))
    }

    // const testLists = [{"id": 1, "name": "First List", "user_id": 1},{"id": 2, "name": "Second List", "user_id": 1}]
    if (!watchlists){
        return null
    }





    if (sessionUser && watchlists) {
    return (
			<div className="home-watchlists">
				<div id="top-watchlist-div">
					<h2 id="add-new-watchlist" style={{marginTop: 5}}>Watchlists</h2>
					<h2 id="button-new-watchlist" style={{ margin: "0 0 0 auto", fontSize: 25 }} onClick={() => setShowNewWatchlist(!showNewWatchlist)}>+</h2>
				</div>
				<div>
					{showNewWatchlist?(<form onSubmit={submitWatchlist}>
						<input
							value={newWatchlist}
							onChange={(e) => setNewWatchlist(e.target.value)}
							required
							placeholder="Create New Watchlist"
						></input>
						<button type="submit">Create List</button>
					</form>):null}
					{Object.keys(watchlists).map((key, index) => (
                        <SingleList watchlist={watchlists[key]}/>
					))}
				</div>
			</div>
		);
    }
}

export default List;

{/* <div className="edit-form">
							<h2
								onClick={(e) => setMainWatchlist(watchlists[key].id)}
								key={index}
							>
								{watchlists[key].name}
							</h2>
							<div className="invisible-list">
								<input
									onChange={(e) => setNewEditName(e.target.value)}
									className="edit-list"
									placeholder={watchlists[key].name}
								></input>
								<button
									onClick={submitEditWatchlist}
									className="submit-edit-list"
								>
									Submit
								</button>
							</div>
							<button
								onClick={(e) => setMainWatchlist(watchlists[key].id)}
								key={watchlists[key].id}
								className="open-edit-input"
							>
								{" "}
								Edit List{" "}
							</button>
							<button onClick={submitAddAsset}>Add to List</button>
							<button onClick={submitDeleteWatchlist}>Delete List</button>
						</div> */}
