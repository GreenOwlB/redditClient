import ReactMarkdown from "react-markdown";

const Post = ({ redditPost }) => {
  
    return (
        <div className="postContainer">
            <h4>{redditPost.title}</h4>
            <div>
                <ReactMarkdown children={redditPost.selftext}/> 
            </div>
        </div>
    );
}

export default Post;