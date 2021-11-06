import './StockNews.css'
import { Link } from 'react-router-dom';
function StockNews(news){
    if (!news){
        return null;
    }
    return(
        <div id="stock-news-card">
            <Link
					to={{
						pathname: news.news.url,
					}}
					target="_blank"
				>
            <img src={news.news.image} id="stock-news-img"/>
            <h1>{news.news.headline}</h1>
            <h2>{news.news.summary}</h2>
            </Link>
        </div>

    )
}

export default StockNews;
