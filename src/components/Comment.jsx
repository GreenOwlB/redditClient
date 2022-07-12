import ReactMarkdown from "react-markdown";
import { TbArrowBigTop } from 'react-icons/tb';



const Comment = ({ comment }) => {
    console.log(comment.data);
    return (
        <div className="commentContainer">

            {comment.kind === "t1" && 
            <>
            <div className="commentSingle">
                <div className="commentTop">
                    <div className="commentScore">
                        <TbArrowBigTop />
                        <span>{comment.data.ups}</span>
                    </div>
                    <p className="commentAuthor">{`u/${comment.data.author}`}</p>

                </div>
                
                <div className="commentBody">
                    <ReactMarkdown children={comment.data.body} />
                </div>
            </div>

            <div>
                {comment.data.replies && comment.data.replies.data.children.map(item => <Comment key={item.data.name} comment={item}/>)}
            </div>
            </>
            }

            {comment.kind === "more" &&
                <p>more....</p>

            }
        </div>
    );
}

export default Comment;