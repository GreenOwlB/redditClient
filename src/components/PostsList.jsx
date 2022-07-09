import Post from "./Post";

const PostList = () => {
    return (
        <div className="postListContainer">
            <h2>Subreddit name</h2>
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default PostList;