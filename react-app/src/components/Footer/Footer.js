import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
		<div className="footer">
			<div id="footer-component">
				<h3>AJ Abushaban</h3>
				<Link
					to={{
						pathname: "https://github.com/asabushaban",
					}}
					target="_blank"
				>
					<i
						className="fab fa-github fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
				<Link
					to={{
						pathname: "https://www.linkedin.com/in/aj-abushaban-919231100/",
					}}
					target="_blank"
				>
					<i
						className="fab fa-linkedin fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
			</div>
			<div id="footer-component">
				<h3>Brandon Laursen</h3>
				<Link
					to={{
						pathname: "https://github.com/brandonlaursen",
					}}
					target="_blank"
				>
					<i
						className="fab fa-github fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
				<Link
					to={{
						pathname: "https://www.linkedin.com/in/brandon-laursen-398563218/",
					}}
					target="_blank"
				>
					<i
						className="fab fa-linkedin fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
			</div>
			<div id="footer-component">
				<h3>Nicolas Sim</h3>
				<Link
					to={{
						pathname: "https://github.com/NJSim",
					}}
					target="_blank"
				>
					<i
						className="fab fa-github fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
				<Link
					to={{
						pathname: "https://www.linkedin.com/in/nicolas-sim/",
					}}
					target="_blank"
				>
					<i
						className="fab fa-linkedin fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
			</div>
			<div id="footer-component">
				<h3>Parker Bolick</h3>
				<Link
					to={{
						pathname: "https://github.com/parkerbo",
					}}
					target="_blank"
				>
					<i
						className="fab fa-github fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
				<Link
					to={{
						pathname: "https://www.linkedin.com/in/parkerbolick/",
					}}
					target="_blank"
				>
					<i
						className="fab fa-linkedin fa-2x"
						style={{ paddingLeft: 10, color: "black" }}
					></i>
				</Link>
			</div>
		</div>
	);
}

export default Footer;
