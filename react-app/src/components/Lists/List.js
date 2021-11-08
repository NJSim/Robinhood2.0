import { useSelector } from "react-redux";


function List(){
    const sessionUser = useSelector(state => state.session.user);

    const testLists = ["My First List", "Cryptos to Watch"]

    return(
        <div className="allLists">
            {testLists.map(list => (
                <div>{list}</div>
            ))}



        </div>
    )
}

export default List;
