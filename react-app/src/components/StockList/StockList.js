
import "./StockList.css"

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList, editList, deleteList, addWatchList, addToWatchlist } from "../../store/lists";


function StockList({assetID}){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const watchlists = useSelector(state => state.watchlists.watchlists);
    const [newEditName, setNewEditName] = useState("");
    const [mainWatchlist, setMainWatchlist] = useState("");
    const [newWatchlist, setNewWatchlist] = useState("");
    const createListForm = useRef(null)
    const CRL = useRef("")
    const [checked, setChecked] = useState(false);



    useEffect(() => {
        if(sessionUser){
            dispatch(getList(sessionUser.id))

        }
    },[dispatch, sessionUser, mainWatchlist])


    const submitWatchlist = async(e) => {
        e.preventDefault();
        if(!sessionUser) return;

        dispatch(addWatchList(newWatchlist, sessionUser.id)).then(() => dispatch(getList(sessionUser.id)))
    }

    const submitAddAsset = async(e) => {
        e.preventDefault()

        dispatch(addToWatchlist(mainWatchlist, assetID)).then(() => dispatch(getList(sessionUser.id)))
    }

    if (!watchlists){
        return null
    }

    const hideAddListForm = () => {
      createListForm.current.classList.add("hidden")
      CRL.current.classList.remove("hidden")
      setNewWatchlist("");
    }

    const hideAddListForm2 = () => {
      createListForm.current.classList.add("hidden")
      CRL.current.classList.remove("hidden")
    }


    const showAddListForm = () => {
      createListForm.current.classList.remove("hidden")
      CRL.current.classList.add("hidden")
    }




    if (sessionUser && watchlists) {
    return(
      <>
        <div className="allLists2">
          <div>
            {/* <h2 className="addNewList"> +  </h2> */}
            <h2 className="showAddListForm" onClick={showAddListForm} ref={CRL}> + Create New List</h2>
          </div>
            <form onSubmit={submitWatchlist} ref={createListForm} className=" hidden addWatchListForm">
                <input
                    value={newWatchlist}
                    onChange={(e) => setNewWatchlist(e.target.value)}
                    required
                    placeholder='List Name'
                    className="addWatchListInput"
                    type="list"
                >
                </input>
                <button type="submit" onClick={hideAddListForm2} className="createListButton">Create List</button>
                <button type="submit1" onClick={hideAddListForm} className="cancelCreateButton">Cancel</button>
            </form>

            {Object.keys(watchlists).map( (key, index) => (
                mainWatchlist === watchlists[key].id ?
                <div className="edit-form2" style={{color: "rgb(0, 185, 5)"}}>
                  <h2 className={`watchlistItems wl${watchlists[key].id}`} onClick={() => setMainWatchlist(watchlists[key].id)} key={watchlists[key].id}>{watchlists[key].name}</h2>
                </div> : <div className="edit-form2">
                  <h2 className={`watchlistItems wl${watchlists[key].id}`} onClick={() => setMainWatchlist(watchlists[key].id)} key={watchlists[key].id}>{watchlists[key].name}</h2>
                </div>
            ))}

        </div>
        <button onClick={submitAddAsset} className="SaveChangesButton">Save Changes</button>
        </>
        )
    }
}

export default StockList;
