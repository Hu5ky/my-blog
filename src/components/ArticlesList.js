import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
    return (
        <>
        {articles.map(article => (
            /*
                For every article in our JSON create a Link component containing title and a preview of an article.
                Pass article.name as a prop to the /articles/:articleId route
            */
            <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                <h3>{article.title}</h3>
                <p>{article.content[0].substring(0, 150)}...</p>
            </Link>
        ))}
        </>
    )
}

export default ArticlesList;