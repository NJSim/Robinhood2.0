import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation/Navigation';
import HomePage from "./components/Home/HomePage";
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Account from './components/Account';
import Stock from './components/Stocks/Stock';
import { authenticate } from './store/session';
import { getPortfolio } from './store/portfolio';
import ScrollingStock from './components/Scrolling-Stocks/ScrollingStocks';
import loadingSpinner from "../src/images/green-loading-spinner.gif";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
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
					{sessionUser?(<div style={{ marginTop: "50px" }}>
						<ScrollingStock style={{ height: "30px" }} />
					</div>):null}

					<HomePage />
				</Route>
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
