import SubRedditItem from "./SubRedditItem";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveSubReddits, fetchSavedSubReddits } from "../features/redditListSlice";
import { useEffect } from "react";

const SubRedditList = () => {

    const dispatch = useDispatch();
    const subreddits = useSelector(selectActiveSubReddits);

    useEffect(() => {
        dispatch(fetchSavedSubReddits());
    },[dispatch])

    return (
        <div className="subRedditListContainer">
            <h2>SubReddits</h2>
            {subreddits && subreddits.map(item => <SubRedditItem key={item.name} item={item} />)}
        </div>
    );
}

export default SubRedditList;