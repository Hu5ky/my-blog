import { useEffect, useState } from "react";
import ArticlesList from "../components/ArticlesList";
//import articles from "./article-content"; //JSON file containing name, title and article content
import axios from "axios";

const ArticlesListPage = () => {
    const [ articles, setArticles ] = useState([]);
    useEffect (() => {
        const loadArticlesFromDb = async () => {
            const response = await axios.get(`/api/articles/`);
            setArticles(response.data);
        }
        loadArticlesFromDb();
    }, []);

    return(
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} /> 
        </>
        //Passing articles JSON to ArticleList component
    )
}

export default ArticlesListPage;