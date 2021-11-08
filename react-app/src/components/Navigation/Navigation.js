import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'
import './Navigation.css';




function Navigation(){

  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
  }


  let isRegistered = (

    <div className="navigation-container">
      <div className="navigation-item navigation-item1">
        <a href="/"><img src={"https://i0.wp.com/www.juststartinvesting.com/wp-content/uploads/2020/08/Robinhood-Logo-New.png?resize=388%2C78&ssl=1"} alt="" height={28} className="logo"></img> </a>
        <nav role="navigation" className="NavigationBar">
          <ul>
            <li>
              <a href="/"> Products  <img  className="arrowNav" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png" alt="" width="20"/></a>

              <ul>
                <li><a href="/"> Stocks </a></li>
                <li><a href="/"> Options </a></li>
                <li><a href="/"> Gold </a></li>
              </ul>
            </li>
            <li>
              <a href="/"> Learn <img  className="arrowNav" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png" alt="" width="20"/></a>
              <ul>
                <li><a href="/"> Investing </a></li>
                <li><a href="/"> Library </a></li>
                <li><a href="/"> Snacks </a></li>
              </ul>
            </li>
            <li>
              <a href="/"> Support </a>
            </li>
            <li>
              <a href="/"> Who we are <img  className="arrowNav" src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png" alt="" width="20"/></a>
            <ul>
                <li><a href="/"> About Us </a></li>
            </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navigation-item navigation-item2">
        <button className='navLogInButton'><a href="/login" className='navLogInText'> Log In </a> </button>
        <button className='navSignUpButton'><a href="/sign-up" className='navSignUpText'> Sign Up </a> </button>
      </div>
    </div>

  )
  if (sessionUser) {
    isRegistered = (
      <>
        <div>
          Test
          <div>
            <button onClick={logout}> Log Out </button>
          </div>
        </div>
      </>
    );
  }

  return(
    <>
      {isRegistered}
    </>
  )
}

export default Navigation;
