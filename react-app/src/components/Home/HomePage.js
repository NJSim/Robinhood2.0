import "./HomePage.css"
import Footer from "../Footer/Footer";
import List from "../Lists/List"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPortfolio } from "../../store/portfolio";


function HomePage(){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    if(sessionUser){
      dispatch(getPortfolio())
    }
  },[dispatch,sessionUser])

  const trendingListsTest = [{"id":1, "name": "Tech"}, {"id":2, "name": "Crypto"}, {"id":3, "name": "IPO"}];


  if (sessionUser) {
    return(
      <>
        <div className="flex1">
          <div className="flex2">
            <div className="dashboardContainer">
              <div className="row">

                <div className="mainContainer">
                  <div className="dashboard-graph">
                    Graph
                  </div>
                  <div className="buyingPower">
                    <div className="buyingText">
                      Buying Power
                    </div>
                    <div className="buyingNumber">
                      {sessionUser.buying_pwr}
                    </div>
                  </div>
                  <div className="taxStatus">
                    <div className="taxHeader">
                      Confirm your tax status

                    </div>
                    <div className="taxMain">
                      Please accept the following agreement to make sure that your tax information is up to date.
                    </div>

                    <div>
                      <a href="/tax-certification">Review agreement</a>
                    </div>

                  </div>

                  <div className="trendingLists">
                    <div className="trendingLists-header">
                      <div>
                        Trending Lists
                      </div>
                      <div>
                        i
                      </div>
                      <div>
                        Show More
                      </div>
                    </div>
                    <div className="trendingLists-main">
                      {trendingListsTest.map(list => (
                        <li key={list.id}>{list.name}</li>
                      ))}
                    </div>

                  </div>

                  <div className="dashboardNews">
                    News Test

                  </div>

                </div>
                <div className="listsContainer">
                  <div className="lists-Nav">
                    Lists +
                  </div>
                  <div>
                    <List/>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </>
    )
  }

  return(
    <>
    <div className="HomePageContainer">
      {/* HomePage container */}
      <div className="HomePageItem1">
        <div className="HomeLeftContainer">
          <div><h1 className='HomeH1'>Investing for Everyone </h1></div>
          <div><span className='HomeSpanText'>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply. </span></div>
            <button className="SignUpHomeButton"><a href="/signUp" className="homeSignUpText">Sign Up </a></button>
          <h3 className="HomeH3"><img src="https://img.icons8.com/ios/50/000000/info--v1.png" alt='' width="30"  height="30" className='circle'/>  Commissions and Free Stock Disclosures</h3>
        </div>
      </div>
      <div className="HomePageItem2">
        <img src={"https://robinhood.com/us/en/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png"} alt="" className='robinpic1'></img>
        <img src={"https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"} alt="" className='robinpic2'></img>
      </div>
    </div>

    <div className="HomePageContainer2">
      <div className="HomePage2Item1">
          <span className="container2Span">See our fee schedule to learn more about cost.</span>
      </div>
    </div>

    <div className="HomePageContainer3" >
      <div className="HomePage3Item1">
        <img src={"https://robinhood.com/us/en/_next/static/images/balloon__ef7d8a9bb1c7845fcb7a6799c35d513e.svg"} alt="" className='robinpic3'></img>
      </div>
      <div className="HomePage3Item2">
        <div><h2 className="hp31">Introducing IPO Access</h2>
          <span className="hp32">Get in at the IPO price. Now, you can become one of the first public investors in upcoming IPOs.</span>
        </div>
        <div>
          <img className="hpI" src={"https://robinhood.com/us/en/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg"} alt=""></img>
          <span className="h1s1">It's your turn</span>
          <p className="h1p1">No minimum account balances or special status requirements.</p>
        </div>
        <div>
          <img  className="hpI" src={"https://robinhood.com/us/en/_next/static/images/one-first__d86b9ee63a8475364159f2d21ea5f01f.svg"} alt=""></img>
          <span className="h1s1">Be one of the first</span>
           <p className="h1p1">Request shares in new companies before their stock starts trading on public exchanges.</p>
        </div>
        <div>
           <img  className="hpI" src={"https://robinhood.com/us/en/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg"} alt=""></img>
           <span className="h1s1">Get a fair shot</span>
           <p className="h1p1">While IPO shares are limited, IPO Access gives you the same opportunity to invest, regardless of order size or account value.</p>
        </div>
        <span className="IPO"> <img src="https://img.icons8.com/ios/50/000000/info--v1.png" alt='' width="30"  height="30" className='circle2'/>IPO Access disclosure</span>
      </div>
    </div>


    <div className="HomePageContainer4">

      <div className="hp41">
        <div className="hp411">
        <span className="hp411Span" > Introducing Fractional Shares </span>
          <span className="hp412Span" > Invest in thousands of stocks with as little as $1. </span>
        </div>
        <div className="hp412">
          <div className="hp41one">
            <span className="hp413Span">Invest Any Amount</span>
            <span className="hp414Span">Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.</span>
          </div>
          <div className="hp41two">
            <span className="hp413Span">Build a Balanced Portfolio</span>
            <span className="hp414Span">Customize your portfolio with pieces of different companies and funds to help reduce risk.</span>
          </div>
          <div className="hp41three">
            <span className="hp413Span">Trade in Real Time</span>
            <span className="hp414Span">Trades placed during market hours are executed at that time, so you’ll always know the share price.</span>
          </div>

        </div>
        <span className="IPO a12"> <img src="https://img.icons8.com/ios/50/000000/info--v1.png" alt='' width="30"  height="30" className='circle2'/>Fractional Shares Disclosure</span>
      </div>


      <div className="hp42"><img className="hpI2" src={"https://robinhood.com/us/en/_next/static/images/3x__e61985cb13c119a29374ade4e7a49a47.png"} alt=""></img></div>
    </div>

    <Footer/>
  </>
  )
}

export default HomePage;
