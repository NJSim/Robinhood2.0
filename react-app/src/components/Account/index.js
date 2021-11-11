import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom";
import { executeTransaction, transactionHistory } from "../../store/transactions";
import HistoryItem from "./historyItem";
import loadingSpinner from "../../images/green-loading-spinner.gif";
import "./Account.css"
import { useEffect, useState } from "react";
import { deleteUser } from "../../store/session";


function Account () {
    const user = useSelector((state) => state.session.user);
    const portfolio = useSelector((state) => state.portfolio.portfolio)
    const transHistory = useSelector((state) => state.transactions.history)
    const history = useHistory();
    const [deactivate, setDeactivate] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(transactionHistory(user.id))
    }, [user])

    if (!user && !portfolio) {
        return (
					<div id="loading">
						<img src={loadingSpinner} alt="Loading..." />
					</div>
				);
    }

    const executeDelete = async() => {
        const done = await dispatch(deleteUser());
        if (done){
        history.push("/")
        }

    }

    return (
			<>
				<Route path="/account">
					<div id="static-account-div">
						<div id="account-nav-div">
							<h1 style={{ paddingBottom: 25 }}>{user.name}</h1>
							<div style={{ display: "flex" }}>
								<NavLink
									to="/account/history"
									activeClassName="account-nav-active"
									className="account-link"
								>
									{" "}
									<p>History</p>
								</NavLink>
								<NavLink
									to="/account/settings"
									activeClassName="account-nav-active"
									className="account-link"
								>
									{" "}
									<p>Settings</p>
								</NavLink>
							</div>
						</div>
					</div>
				</Route>
				<Switch>
					<Route path="/account/history">
						<div id="trans-history-div">
							<div id="slim-history">
								<h1
									style={{
										marginTop: 40,
										borderBottom: "1px solid #E3E9ED",
										paddingBottom: 10,
									}}
								>
									Transaction History{" "}
									<p style={{ display: "inline", fontSize: 15 }}>
										(up to 30 most recent)
									</p>
								</h1>
								{Object.keys(transHistory).length > 0
									? Object.keys(transHistory)
											.sort((a, b) => b - a)
											.map((item) => (
												<HistoryItem transaction={transHistory[item]} />
											))
									: "No transaction history"}
							</div>
						</div>
					</Route>
					<Route path="/account/settings">
						{deactivate ? (
							<div id="trans-history-div">
								<div id="slim-history">
									<h1
										style={{
											marginTop: 40,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
											color: "#FF5000",
										}}
									>
										Deactivate Your Account
									</h1>
									<div
										style={{
											marginTop: 20,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
											fontSize: 20,
											display: "flex",
										}}
									>
										<div>
											Deactivating your account will liquidate all your assets
											and cash out your balance. Do you wish to continue?
										</div>
									</div>
									<div
										style={{
											marginTop: 20,
											paddingBottom: 10,
											fontSize: 20,
											display: "flex",
										}}
									>
										<div
											style={{ fontSize: 25, fontWeight: 900, margin: 0 }}
											id="deactivate"
											onClick={() => setDeactivate(false)}
										>
											Nevermind
										</div>
										<div style={{ margin: "0 0 0 auto" }} id="deactivate">
											<span
												onClick={executeDelete}
												style={{
													color: "#FF5000",
												}}
											>
												Deactivate my account
											</span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div id="trans-history-div">
								<div id="slim-history">
									<h1
										style={{
											marginTop: 40,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
										}}
									>
										Account Information
									</h1>
									<div
										style={{
											marginTop: 20,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
											fontSize: 20,
											display: "flex",
										}}
									>
										<div>Name</div>
										<div style={{ margin: "0 0 0 auto" }}>
											<span
												style={{
													color: "#697277",
												}}
											>
												{user.name}
											</span>
										</div>
									</div>
									<div
										style={{
											marginTop: 20,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
											fontSize: 20,
											display: "flex",
										}}
									>
										<div>Email Address</div>
										<div style={{ margin: "0 0 0 auto" }}>
											<span
												style={{
													color: "#697277",
												}}
											>
												{user.email}
											</span>
										</div>
									</div>
									<div
										style={{
											marginTop: 20,
											borderBottom: "1px solid #E3E9ED",
											paddingBottom: 10,
											fontSize: 20,
											display: "flex",
										}}
									>
										<div>Current Buying Power</div>
										<div style={{ margin: "0 0 0 auto" }}>
											<span
												style={{
													color: "#697277",
												}}
											>
												$
												{user.buying_pwr
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
												USD
											</span>
										</div>
									</div>
									<div
										style={{
											marginTop: 40,
											paddingBottom: 10,
											fontSize: 8,
											fontWeight: 900,
											display: "flex",
										}}
									>
										<div></div>
										<div style={{ margin: "0 0 0 auto" }}>
											<h1
												style={{
													color: "#FF5000",
												}}
												id="deactivate"
												onClick={() => setDeactivate(true)}
											>
												Deactivate your account
											</h1>
										</div>
									</div>
								</div>
							</div>
						)}
					</Route>
				</Switch>
			</>
		);
}

export default Account
