import { useEffect } from "react";
import Post from "./Post";

import { fetchRedditPosts, selectList,  selectSubReddit, selectIsLoading } from "../features/redditListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { selectSearch } from "../features/redditListSlice";

const PostList = () => {

    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSubReddit);
    const list = useSelector(selectList);
    const loading = useSelector(selectIsLoading);
    const search = useSelector(selectSearch);

    const [filteredList, setFilteredList] = useState([]);


    useEffect(() => {
            dispatch(fetchRedditPosts(selectedSubreddit));
    },[selectedSubreddit, dispatch]);

    useEffect(() => {
        const filtered = list.filter(item => item.data.title.includes(search) || item.data.selftext.includes(search));
        setFilteredList(filtered);
    },[search, list]);

    console.log(filteredList);

    return (
        <div className="postListContainer">
            <h2>{loading ? "Loading data..." : list[0].data.subreddit}</h2>
            {(search ? filteredList : list).map(post => {
                return (
                    <Post key={post.data.id} redditPost={post.data}   />
                );
            })}
        </div>
    );
}

export default PostList;