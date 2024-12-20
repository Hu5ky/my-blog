import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({content: [], upvotes: 0, comments: [], canUpvote: false}) 
    const { articleId } = useParams(); 
    const { user } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};

            try {
                const response = await axios.get(`/api/articles/${articleId}`, { headers });
                const newArticleInfo = response.data;
                setArticleInfo(newArticleInfo);
            } catch (error) {
                console.error("Error fetching article:", error);
                // Consider adding error handling here, like setting an error state
            }
        }
        loadArticleInfo(); 
    }, [articleId, user]); // Add articleId to the dependency array

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};

        try {
            const response = await axios.put(`/api/articles/${articleId}/upvote`, {}, { headers });
            const updatedArticle = response.data;
            setArticleInfo(updatedArticle);
        } catch (error) {
            console.error("Error upvoting article:", error);
            // Consider adding error handling here
        }
    }

    return (
        <>
        <h1>{articleInfo.title}</h1>

        <div className="upvotes-section">
            {user
                ? <button onClick={addUpvote}>{articleInfo.canUpvote ? 'Upvote' : 'Already upvoted!'}</button>
                : <button disabled>Log In to upvote!</button>}
            <p>This article has: {articleInfo.upvotes} upvote(s)</p>    
        </div>

        {articleInfo.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}

        {user
            ? <AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
            : <button disabled>Log In to comment!</button>}
        {<CommentsList comments={articleInfo.comments || []} />} 
        </>
    )
}

export default ArticlePage;