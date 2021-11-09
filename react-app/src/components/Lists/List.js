
import { useSelector } from "react-redux";
import "./List.css"


function List(){
    //const sessionUser = useSelector(state => state.session.user);

    const testLists = [{"id": 1, "name": "First List", "user_id": 1},{"id": 2, "name": "Second List", "user_id": 1}]

    return(
        <div className="allLists">
            {testLists.map(list => (
                <>
                    <li className="listItems2" key={list.user_id}>{list.name}</li>
                </>
            ))}


        </div>
    )
}

export default List;
