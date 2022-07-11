import { useEffect } from "react";
import Post from "./Post";

import { fetchRedditPosts, selectList,  selectSubReddit, selectIsLoading } from "../features/redditListSlice";
import { useDispatch, useSelector } from "react-redux";

const PostList = () => {

    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSubReddit);
    const list = useSelector(selectList);
    const loading = useSelector(selectIsLoading);

    useEffect(() => {
            dispatch(fetchRedditPosts(selectedSubreddit));
    },[selectedSubreddit, dispatch]);

    return (
        <div className="postListContainer">
            <h2>{loading ? "Loading data..." : list[0].data.subreddit}</h2>
            {list.map(post => {
                return (
                    <Post key={post.data.id} redditPost={post.data}   />
                );
            })}
        </div>
    );
}

export default PostList;