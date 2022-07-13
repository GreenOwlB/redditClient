import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TbArrowBigDownLines, TbArrowBigUpLines, TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';
import { fetchComments } from '../features/redditListSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentComments } from "../features/redditListSlice";
import Comments from "./Comments";
import { GoCommentDiscussion } from 'react-icons/go';



const Post = ({ redditPost }) => {

    const dispatch = useDispatch();
    const [showFullText, setShowFullText] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const item = redditPost.name.split("_")[1];
    const current = useSelector(selectCurrentComments);
    

    //notes:
    //is_self : has body text
    //domain: internal or external link
    //is_reddit_media_domain: image/video on reddit 
    //is_video: reddit video

    //post_hint  <--- ?

  
    const handleShowFullText = () => {
        setShowFullText(prev => !prev);
    }

    const handleLoadComments = () => {
        if (showComments) {
            setShowComments(false);
            return;
        }
        const item = redditPost.name.split("_")[1];
        const subreddit = redditPost.subreddit;
        setShowFullText(true);
        setShowComments(true);

        dispatch(fetchComments({
            item,
            subreddit,
        }));

    }

    useEffect(() => {
        if (current !== item) {
            setShowComments(false);
            setShowFullText(false);
        }
    },[current])

    return (
        // <div className={`postContainer ${showFullText ? "active": ""}`}>
        <div className={`postContainer ${showComments ? "active" : ""}`}>

            <div className="postHeader">
                <div className="top">
                    <p className="author">{`u/${redditPost.author}`}</p>
                    <div className="score"> 
                        <div className="arrows">
                            <TbArrowBigTop />
                            <TbArrowBigDown />
                        </div>
                        <div className="scoreNumbers">
                            {redditPost.ups}  / {`${redditPost.upvote_ratio * 100}%`}  
                        </div>
                    </div>

                    {/* {redditPost.is_self &&
                    <div 
                        className="showMore"
                        onClick={handleShowFullText}
                    >
                        {showFullText ? <TbArrowBigUpLines /> : <TbArrowBigDownLines /> }
                        <div className="tooltip">
                            {showFullText ? "Less" : "More"}
                        </div>
                    </div>
                    } */}

                </div>
                <h4>{redditPost.title}</h4>
            </div>

            <div className="postBody">
                <div className="media">
                    {redditPost.is_reddit_media_domain && !redditPost.is_video && 
                        <div className="imageContainer">
                        <img src={redditPost.url} alt="" />
                        </div>
                    }
                    {redditPost.is_reddit_media_domain && redditPost.is_video && 
                        <div>
                            <video width="480" height="360" controls autoPlay muted>
                                <source src={redditPost.secure_media.reddit_video.fallback_url} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    }
                </div>

                <div className={`textSection ${showFullText ? "active": ""}`}>
                    <ReactMarkdown children={redditPost.selftext}/> 

                    {redditPost.is_self &&
                    <div 
                        className="showMore"
                        onClick={handleShowFullText}
                    >
                        <div className="tooltip">
                            {showFullText ? "Less" : "More"}
                        </div>

                        {showFullText ? <TbArrowBigUpLines /> : <TbArrowBigDownLines /> }
                    </div>
                    }



                </div>
            </div>

            <div className="postBottom">
                <button
                    onClick={handleLoadComments}
                >
                    { <GoCommentDiscussion />}
                    <span className="commentNumber">{redditPost.num_comments}</span>
                    
                    
                    {` ${showComments ? "Close comments" : ""}`}
                </button>

            </div>


            {showComments && item === current && <Comments item={item} />}
            <div>
                {showComments && 
                    <button
                    onClick={handleLoadComments}
                >
                    Hide comments
                </button>
                }
            </div>
        </div>
    );
}

export default Post;