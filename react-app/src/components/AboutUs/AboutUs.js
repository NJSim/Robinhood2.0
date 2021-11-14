import "./AboutUs.css";
import image from "./AJ-Headshot.jpg";


function AboutUs() {
  return (
    <div id="main-about-container">
      <div className="about-me">
        <h1 style={{ textAlign: "center", marginBottom: "25px" }}>About Us</h1>
        <div id="inner-about">
          <div id="name-pic-links">
            <h2>AJ Abushaban</h2>
            <img id="aj-headshot" src={image} />
            <div>
              <a target="_blank" href="https://github.com/asabushaban">
                <img
                  id="github-about"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/aj-abushaban-919231100/"
              >
                <img
                  id="linkedin-about"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
                />
              </a>
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <h4 style={{ fontWeight: "1000" }}>
              After spending 4 years at a tech startup in various business
              development roles, I decided to take a pivot in my career and help
              build the future. Summer 2021 I was accepted into App Academy's
              6-month immersive full-time web development bootcamp, which has a
              3% acceptance rate. Throughout the program I have attained an
              understanding of multiple full-stack programming skills including,
              JavaScript, Data Structures and Algorithms, Object-Oriented
              Programming, HTML, CSS, and Relational Databases.
            </h4>
            <h6>
              My interests are blockchain technology, macroeconomics, philosophy
              and computer science. I am fascinated with with "the next
              revolutionary tech" and can't wait to build it.
            </h6>
            <h6>
              Full-Stack Software Engineer | JavaScript | Python | React | Redux
              | Node.js | Express.js | Sequelize | Flask | SQLAlchemy
            </h6>
            <h6>University of Houston, Bachelors degree, Finance, 2016</h6>
          </div>
        </div>

         <div id="inner-about">
          <div id="name-pic-links">
            <h2>Brandon Laursen</h2>
            <img id="aj-headshot" src={"https://media-exp1.licdn.com/dms/image/C4E03AQE6HzTYkP3dog/profile-displayphoto-shrink_800_800/0/1630269214395?e=1642636800&v=beta&t=32xt1i2Rd7kt0i_cVnJOiWvnaQxsu48uJtxsJfW1CMU"} />
            <div>
              <a target="_blank" href="https://github.com/brandonlaursen">
                <img
                  id="github-about"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/brandon-laursen-398563218/"
              >
                <img
                  id="linkedin-about"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
                />
              </a>
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <h4 style={{ fontWeight: "1000" }}>
              TBD
            </h4>
            <h6>
             TBD
            </h6>
            <h6>
              Full-Stack Software Engineer | JavaScript | Python | React | Redux
              | Node.js | Express.js | Sequelize | Flask | SQLAlchemy
            </h6>
            <h6>University of South Florida, Bachelors degree, Health Sciences, 2020</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
