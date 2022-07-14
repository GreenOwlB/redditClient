import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubReddit } from '../features/redditListSlice';

const SubRedditAddition = () => {

    const dispatch = useDispatch();
    const [newSubreddit, setNewSubreddit] = useState('');

    const handleClick = () => {
        dispatch(addSubReddit(newSubreddit));
    }

    return (
        <div className="addSubreddit">
            <div className="inputContainer">
                <input 
                    type="text" 
                    placeholder="Add subreddit..."
                    value={newSubreddit}
                    onChange={(e) => setNewSubreddit(e.target.value)}
                />
                <button onClick={handleClick}>Add</button>
            </div>
        </div>
    );
}

export default SubRedditAddition;