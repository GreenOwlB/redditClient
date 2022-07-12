import { selectComments, selectCurrentComments } from "../features/redditListSlice";
import { useSelector } from "react-redux/es/exports";
import Comment from "./Comment";

const Comments = ({ item }) => {

    const current = useSelector(selectCurrentComments);
    const comments = useSelector(selectComments);


    return (
        <div className="commentsSection">
            
            {item === current && 
                
                comments.map(comment => <Comment key={comment.data.name} comment={comment}/>)
            
            }

        </div>
    );
}

export default Comments;