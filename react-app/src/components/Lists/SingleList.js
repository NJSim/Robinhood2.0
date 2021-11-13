import "./SingleList.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import {
	getList,
	editList,
	deleteList,
	addWatchList,
	addToWatchlist,
} from "../../store/lists";

function SingleList({ watchlist }) {
    const sessionUser = useSelector((state) => state.session.user);
    const stocks = useSelector((state) => state.stocks.allStocks);
	const [showList, setShowList] = useState(false);
    const [show, setShow] = useState(false);
    const [newEditName, setNewEditName] = useState("");
	const [options, setOptions] = useState(false);
    const [mainWatchlist, setMainWatchlist] = useState("");
	const [showDots, setShowDots] = useState(false);
	const caret = showList ? "up" : "down";
	const assets = watchlist.watched_assets;
    const dispatch = useDispatch();
	function showOptions(ev) {
		ev.preventDefault();
		ev.stopPropagation();
        setOptions(!options);
	}

     const submitEditWatchlist = async (e) => {
				e.preventDefault();
				dispatch(editList(mainWatchlist, newEditName, sessionUser.id)).then(
					() => dispatch(getList(sessionUser.id))
				);
			};

	return (
		<>
			<Modal title="Edit List" show={show} onClose={() => setShow(false)}>
				<input
					onChange={(e) => setNewEditName(e.target.value)}
					className="edit-list"
					placeholder={watchlist.name}
					value={newEditName}
					className="ELInput"
				></input>
				<div className="modal-footer">
					{/* <button onClick={props.onClose} className="button">Close</button> */}

					<button
						onClick={(e) => {
							e.preventDefault();
							dispatch(
								editList(watchlist.id, newEditName, sessionUser.id)
							).then(() => dispatch(getList(sessionUser.id)));
							setShow(false);
							setNewEditName("");
						}}
						className="submit-edit-list"
					>
						Submit
					</button>
				</div>
			</Modal>
			<div
				id="single-watchlist-div"
				onClick={() => setShowList(!showList)}
				onMouseEnter={() => setShowDots(true)}
				onMouseLeave={() => {
					if (!options) {
						setShowDots(false);
					}
				}}
			>
				{watchlist.name}
				<div id="watchlist-options" onClick={showOptions}>
					{showDots ? <i class="fas fa-ellipsis-h"></i> : null}
					{options ? (
						<div id="show-watchlist-options">
							<p id="options-list-option" onClick={() => setShow(true)}>
								Edit List
							</p>
							<p
								id="options-list-option"
								onClick={(e) => {
									e.stopPropagation();
									dispatch(deleteList(watchlist.id)).then(() =>
										dispatch(getList(sessionUser.id))
									);
									setOptions(false);
								}}
							>
								Delete List
							</p>
						</div>
					) : null}
				</div>
				<i
					className={`fas fa-caret-${caret}`}
					style={{ paddingRight: 8, marginLeft: "40px" }}
				></i>
			</div>
			{showList ? (
				<div id="watchlist-assets-list">
					{Object.keys(assets).map((key, index) => (
						<NavLink to={`/stocks/${assets[key].asset_id}`}>
							<div id="individual-list-asset">
								{assets[key].symbol}
								<div
									style={{
										marginLeft: "auto",
										paddingRight: 20,
										display: "flex",
										flexDirection: "column",
									}}
								>
									<p style={{ fontSize: 11 }}>
										${stocks[assets[key].symbol].quote.latestPrice}
									</p>
									<p style={{ fontSize: 11, margin: 0, textAlign: "right" }}>
										${stocks[assets[key].symbol].quote.changePercent.toFixed(2)}
									</p>
								</div>
							</div>
						</NavLink>
					))}
				</div>
			) : null}
		</>
	);
}

export default SingleList;
