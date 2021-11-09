
import { useSelector } from "react-redux";
import "./List.css"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../../store/lists";

function List(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const watchlists = useSelector(state => state.watchlists.watchlists)

    useEffect(() => {
        if(sessionUser){
            dispatch(getList(sessionUser.id))
        }
    },[dispatch, sessionUser])


    // const testLists = [{"id": 1, "name": "First List", "user_id": 1},{"id": 2, "name": "Second List", "user_id": 1}]
    if (!watchlists){
        return null
    }
    return(
        <div className="allLists">


            {Object.keys(watchlists).map( (key, index) => (

                <h2 key={watchlists[key].id}>{watchlists[key].name}</h2>

            ))}

        </div>
    )
}

export default List;
