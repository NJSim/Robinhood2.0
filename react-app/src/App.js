import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/Home/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/Home/SplashPage";
import Account from "./components/Account";
import Stock from "./components/Stocks/Stock";
import { authenticate } from "./store/session";
import { getPortfolio } from "./store/portfolio";
import ScrollingStock from "./components/Scrolling-Stocks/ScrollingStocks";
import loadingSpinner from "../src/images/green-loading-spinner.gif";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const portfolio = useSelector(state => state.portfolio.portfolio);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getPortfolio()).then(() => setLoaded(true))

    })();
  }, [dispatch]);

  if (!loaded) {
    return (
      <div id="loading">
        <img src={loadingSpinner} alt="Loading..." />
      </div>
    );
  }

  return (
		<BrowserRouter>
			<Navigation></Navigation>
			<Switch>
				<Route exact path="/">
					{sessionUser? <Redirect to='/portfolio' />: null}
					<SplashPage />
				</Route>
				<ProtectedRoute exact path="/portfolio">
					{sessionUser ? (
						<div style={{ marginTop: "50px" }}>
							<ScrollingStock style={{ height: "30px" }} />
						</div>
					) : null}
						{sessionUser && portfolio ? <HomePage />: null}
				</ProtectedRoute>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/account">
					<Account />
				</ProtectedRoute>
				<ProtectedRoute path="/stocks/:stockId" exact={true}>
					<div style={{ marginTop: "50px" }}>
						<ScrollingStock style={{ height: "30px" }} />
					</div>
					<Stock />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
