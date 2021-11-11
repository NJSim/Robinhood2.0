import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import loadingSpinner from "../src/images/green-loading-spinner.gif";

function App() {
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
			<Navigation/>
			<Switch>
				<Route exact path='/'>
          			<HomePage />
        		</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/account" >
					<Account />
				</ProtectedRoute>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/stocks/:stockId" exact={true}>
					<Stock />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
