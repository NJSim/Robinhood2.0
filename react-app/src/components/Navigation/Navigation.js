import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import * as sessionActions from '../../store/session'
import './Navigation.css';
import { getQuery, clearQuery } from '../../store/search';
import { NavLink } from 'react-router-dom';
import MoonLogo from "../../images/ToTheMoon-Logo-New.png"
import MoonRocket from "../../images/ToTheMoonRocket.png";
import MoonRocketGreen from "../../images/ToTheMoonRocketGreen.png";
import { Redirect, useHistory } from 'react-router-dom';

function Navigation(){

  const sessionUser = useSelector(state => state.session.user);
  const queryResults = useSelector(state => state.search.results)
  const allStocks = useSelector(state => state.stocks.allStocks);

  const [logoSource, setLogoSource] = useState(MoonRocket);
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getQuery(query))
    if (query == ''){
      dispatch(clearQuery())
    }
  }, [dispatch, query])

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
  }

  const demo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("demo@aa.io", "password"))
    return <Redirect to="/portfolio" />;
  }


// ---------------------------------------
const showResults = () => {
	const searchRes = document.querySelector(".searchResults")
	searchRes.style.display = "flex"
}

const hideResults = () => {
	const searchRes = document.querySelector(".searchResults")
	searchRes.style.display = "none"
}
// ---------------------------------------

const submitSearch = () => {
	document.querySelector(".SB").value=""
	dispatch(clearQuery());
}

  let searchBar = (
    <div className="searchBarQuery" >
        <div className="searchResults" >
          {Object.keys(queryResults).map((key) => {
            return <NavLink className="result" to={`/stocks/${key}`} value={key}  onClick={submitSearch}>{queryResults[key]} - {allStocks[queryResults[key]].quote.companyName} </NavLink>
          })
          }
        </div>
    </div>
  )


  let isRegistered = (
		<div className="navigation-container" >
			<div className="navigation-item navigation-item1">
				<NavLink to="/">
					<img src={MoonLogo} alt="" height={28} className="logo"></img>{" "}
				</NavLink>
				<nav role="navigation" className="NavigationBar">
					<ul>
						<li>
							<a style={{ paddingTop: 10 }} href="/" id="nav-link-small">
								{" "}
								Products{" "}
								<img
									className="arrowNav"
									src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
									alt=""
									width="20"
								/>
							</a>

							<ul>
								<li>
									<a href="/"> Stocks </a>
								</li>
								<li>
									<a href="/"> Options </a>
								</li>
								<li>
									<a href="/"> Gold </a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/">
								{" "}
								Learn{" "}
								<img
									className="arrowNav"
									src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
									alt=""
									width="20"
								/>
							</a>
							<ul>
								<li>
									<a href="/"> Investing </a>
								</li>
								<li>
									<a href="/"> Library </a>
								</li>
								<li>
									<a href="/"> Snacks </a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/"> Support </a>
						</li>
						<li>
							<a href="/">
								{" "}
								Who we are{" "}
								<img
									className="arrowNav"
									src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
									alt=""
									width="20"
								/>
							</a>
							<ul>
								<li>
									<a href="/"> About Us </a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
			<div className="navigation-item navigation-item2">
				<button className="demo-loginNav" onMouseDown={demo} onClick={() => history.push('/portfolio')}>
					Demo
				</button>
				<button className="navLogInButton">
					<NavLink to="/login" className="navLogInText">
						{" "}
						Log In{" "}
					</NavLink>{" "}
				</button>
				<button className="navSignUpButton">
					<NavLink to="/sign-up" className="navSignUpText">
						{" "}
						Sign Up{" "}
					</NavLink>{" "}
				</button>
			</div>
		</div>
	);
  if (sessionUser) {
    isRegistered = (
			<div className="dashboard-container" >
				<div className="dashboard-wrapper">
					<div className="dashboard-logo" style={{ marginTop: 20 }}>
						<NavLink
							to="/"
							onMouseEnter={() => setLogoSource(MoonRocketGreen)}
							onMouseLeave={() => setLogoSource(MoonRocket)}
						>
							<img src={logoSource} alt="ToTheMoonRocket" width="30" />
						</NavLink>
					</div>
					<div className="search">
						<div className="dashboard-search">
							<div className="searchIcon">
								<svg
									className="search-logo"
									fill="none"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3
                  5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071
                  20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629
                  7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z"
										fillRule="evenodd"
									></path>
								</svg>
							</div>

							<div className="searchbar"
									onMouseEnter={showResults}
									onMouseLeave={hideResults}

							 >
								<input
									type="search"
									onKeyUp={(e) => setQuery(e.target.value)}
									style={{
										width: "100%",
										height: 44,
										border: "none",
										outline: "none",
										fontSize: 15,
									}}
									placeholder="Search"
									type="search"
									className="SB"
								></input>

								{searchBar}
							</div>
						</div>
					</div>

					<div className="dashboard-list">
						<div className="dashboard-list-container">
							<NavLink to="/" className="nav-hyper">
								<span>Portfolio</span>
							</NavLink>

							<NavLink
								to="/account/history"
								className="nav-hyper"
								style={{ marginRight: 20 }}
							>
								<span>Account</span>
							</NavLink>
						</div>
					</div>
					<button onClick={logout} style={{ marginRight: 30 }}>
						{" "}
						Log Out{" "}
					</button>
				</div>
			</div>
		);
  }

  return(
    <>
      {isRegistered}
    </>
  )
}

export default Navigation;
