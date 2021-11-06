import "./HomePage.css"




function HomePage(){
  return(
    <>
      <div className="HomePageContainer">
        <div className="HomePageItem1">
          <div className="HomeLeftContainer">
            <div><h1 className='HomeH1'>Investing for Everyone </h1></div>
            <div><span className='HomeSpanText'>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply. </span></div>
              <button className="SignUpHomeButton"><a href="/sign-up" className="homeSignUpText">Sign Up </a></button>
            <h3 className="HomeH3"><img src="https://img.icons8.com/ios/50/000000/info--v1.png" alt='' width="30"  height="30" className='circle'/>  Commissions and Free Stock Disclosures</h3>
          </div>
        </div>
        <div className="HomePageItem2">
          <img src={"https://robinhood.com/us/en/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png"} alt="" className='robinpic1'></img>
          <img src={"https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"} alt="" className='robinpic2'></img>
        </div>
      </div>
    </>
  )
}

export default HomePage;
