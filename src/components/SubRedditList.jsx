import SubRedditItem from "./SubRedditItem";
import { useSelector } from "react-redux";
import { selectBaseSubReddits } from "../features/redditListSlice";

const SubRedditList = () => {

    const subreddits = useSelector(selectBaseSubReddits);

    return (
        <div className="subRedditListContainer">
            <h2>SubReddits</h2>
            {subreddits && subreddits.map(item => <SubRedditItem key={item.name} item={item} />)}
        </div>
    );
}

export default SubRedditList;