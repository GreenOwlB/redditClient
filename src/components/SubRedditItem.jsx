import { useDispatch } from "react-redux/es/exports";
import { changeSubReddit } from "../features/redditListSlice";

const SubRedditItem = ({ item }) => {

    const dispatch = useDispatch();
    

    const handleClick = e => {
        dispatch(changeSubReddit(e.target.name));
    
    };

    return (
        <div className="subredditItemContainer">
            <button
                onClick={handleClick}
                name={item.name}
            >{item.name}</button>
        </div>
    );
}

export default SubRedditItem;