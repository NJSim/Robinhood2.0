import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div id="innerFooter">
        <h3>AJ Abushaban</h3>
        <a target="_blank" href="https://github.com/asabushaban">
          <img
            id="github"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/aj-abushaban-919231100/"
        >
          <img
            id="linkedin"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
          />
        </a>

         <h3>Brandon Laursen</h3>
        <a target="_blank" href="https://github.com/brandonlaursen">
          <img
            id="github"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/brandon-laursen-398563218/"
        >
          <img
            id="linkedin"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
