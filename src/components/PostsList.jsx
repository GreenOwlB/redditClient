import { useEffect } from "react";
import Post from "./Post";

import { fetchRedditPosts, selectList,  selectSubReddit, selectIsLoading } from "../features/redditListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { selectSearch, selectSearchTitle, selectSearchText } from "../features/searchSlice";

const PostList = () => {

    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSubReddit);
    const list = useSelector(selectList);
    const loading = useSelector(selectIsLoading);
    const search = useSelector(selectSearch);
    const searchTitle = useSelector(selectSearchTitle);
    const searchText = useSelector(selectSearchText);
    // const searchComments = useSelector(selectSearchComments);
    // const openComments = useSelector(selectOpenComments);

    const [filteredList, setFilteredList] = useState([]);


    useEffect(() => {
            dispatch(fetchRedditPosts(selectedSubreddit));
    },[selectedSubreddit, dispatch]);

    useEffect(() => {
        const filtered = list.filter(item => (searchTitle && item.data.title.includes(search)) || (searchText && item.data.selftext.includes(search)));
        setFilteredList(filtered);
    },[search, searchTitle, searchText, list]);

    return (
        <div className="postListContainer">
            <h2>{loading ? "Loading data..." : `r/${list[0].data.subreddit}`}</h2>
            {(search ? filteredList : list).map(post => {
                return (
                    <Post key={post.data.id} redditPost={post.data}   />
                );
            })}
            {search && !filteredList.length && 
            <p className="noSearchResults">No search results found for {search}.</p>}
        </div>
    );
}

export default PostList;