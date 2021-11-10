import "./StockNews.css";
import { Link } from "react-router-dom";
function StockNews(news) {
  if (!news) {
    return null;
  }
  return (
		<>
			<div id="stock-news-card">
				<Link
					to={{
						pathname: news.news.url,
					}}
					target="_blank"
				>
					<div id="news-info">
						<h5 style={{ fontSize: 14, marginBottom: 10 }}>
							{news.news.source}
						</h5>
						<h1 style={{ fontWeight: 900, fontSize: 16, marginBottom: 20 }}>
							{news.news.headline}
						</h1>
						<h2 style={{ color: "#697277" }}>{news.news.summary}</h2>
					</div>
					<img src={news.news.image} id="stock-news-img" />
				</Link>
			</div>
		</>
	);
}

export default StockNews;
