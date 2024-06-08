import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VscBook } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import FeedHero from '../img/feed-hero.png';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineViewStream } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllContent, getContent } from '../store/postSlice';
import { postComment, deleteComment } from '../store/commentSlice';
import { AiOutlineDelete } from 'react-icons/ai';

import './Post.css';
import { Comment, CommentType } from '../data/commentData';
import { getCurrentUser } from '../store/userSlice';
import Header from './Header';
import Navigation from './Navigation';
import { LikeType, NewLikeObj } from '../data/likeData';
import { postLike, deleteLike } from '../store/likeSlice';
import MobileNavigation from './MobileNavigation';
import MobileHeader from './MobileHeader';

const PostDetail: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);

  const user = currentUser;

  const { post, isLoading, loadingError, navigationDisplay } = useAppSelector(
    (store) => store.posts
  );

  const [likeObj, setLikeObj] = useState<NewLikeObj>({
    user_id: 1,
    post_id: 1,
  });
  const [likeBtnState, setLikeBtnState] = useState({ btnState: false });

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState<Comment>({
    user_id: 1,
    post_id: 1,
    text: '',
  });

  const param = useParams();
  const postId = Number(param.postId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());

    dispatch(getContent(postId));
    if (likeBtnState.btnState) {
      dispatch(postLike(likeObj));
    } else {
      dispatch(deleteLike(likeObj));
    }
  }, [dispatch, likeBtnState.btnState]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const {
    topic,
    content,
    post_image_url,
    posterDetail,
    created_at,
    comments,
    likes,
  } = post;

  const { firstname, lastname, id } = posterDetail;
  const authorName = firstname + ' ' + lastname;

  const commentsArray: CommentType[] = [...comments];
  const likesArray: LikeType[] = [...likes];

  const date = new Date(created_at);
  const createdDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const onCommentBtnClick = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (currentUser?.firstname) {
      setShowCommentBox(true);
    } else {
      navigate('/login');
    }
  };

  const submitCommentHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    await dispatch(postComment(newComment));
    setNewComment({
      ...newComment,
      text: '',
    });
    setShowCommentBox(false);
    dispatch(getContent(postId));
  };

  const commentDeleteHandler = (
    commentId: number | null,
    userId: number | null,
    postId: number
  ) => {
    const commentDeleteDetail = {
      commentId,
      userId,
      postId,
    };
    dispatch(deleteComment(commentDeleteDetail)).then((response) => {
      if (response.payload.status) {
        dispatch(getContent(postId));
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (loadingError) {
    return <p>Unable to load post</p>;
  }

  return (
    <div className="post-detail-container">
      {currentUser && <Navigation />}

      <div style={{ display: navigationDisplay ? 'flex' : 'none' }}>
        <MobileNavigation />
      </div>

      <div className="post-detail">
        <Header />
        <MobileHeader />
        <div className="post-detail-content">
          <div className="content-details">
            <CgProfile className="author-picture" />
            <div className="content-description">
              <p>{authorName}</p>

              <span>{createdDate}</span>
              <span className="d-time">{date.toLocaleTimeString()}</span>
            </div>
          </div>
          <h2>{topic}</h2>
          <div className="read-time">
            <VscBook />
            <span>10 mins read</span>
          </div>

          <p>{content}</p>
          <img src={post_image_url} alt="post image" className="post-hero" />

          <div className="comments">
            <div className="like-comment-headings">
              <h4>Comments ({commentsArray.length})</h4>
              <div className="likes">
                <form
                  onSubmit={(e: React.FormEvent<EventTarget>) => {
                    e.preventDefault();

                    if (currentUser?.firstname) {
                      setLikeObj({ ...likeObj, post_id: postId });
                      setLikeBtnState((prev) => ({
                        ...prev,
                        btnState: !prev.btnState,
                      }));
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <button type="submit" className="like-btn">
                    <FaRegHeart
                      className="icon"
                      style={{
                        backgroundColor: `${
                          likeBtnState.btnState ? 'red' : 'white'
                        }`,
                        fill: `${likeBtnState.btnState ? 'white' : ''}`,
                        cursor: 'pointer',
                      }}
                    />
                  </button>
                </form>

                <h4>Likes({likesArray.length})</h4>
                {likesArray.map((like) => (
                  <ul className="like-poster-detail" key={like.id}>
                    {like.user_id === currentUser?.id ? (
                      <li>You,</li>
                    ) : (
                      <li>{like.likerDetail.firstname},</li>
                    )}
                  </ul>
                ))}

                <span>
                  {likesArray.length === 0
                    ? ''
                    : likesArray.length === 1
                    ? 'likes this post'
                    : 'like this post'}
                </span>
              </div>
            </div>

            {commentsArray.map((comment) => (
              <div className="comment" key={comment.id}>
                <p className="post-comments">{comment.text}</p>
                <div className="commenter">
                  <div className="commenter-details">
                    <span>
                      {comment.commenterDetail.firstname +
                        ' ' +
                        comment.commenterDetail.lastname}
                    </span>

                    <span className="comment-date">
                      {new Date(
                        Date.parse(comment.created_at)
                      ).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(
                        Date.parse(comment.created_at)
                      ).toLocaleTimeString()}
                    </span>
                  </div>

                  {currentUser?.id === comment.user_id && (
                    <form
                      onSubmit={(e: React.FormEvent<EventTarget>) => {
                        e.preventDefault();
                        commentDeleteHandler(
                          comment.id,
                          currentUser.id,
                          comment.post_id
                        );
                      }}
                    >
                      <button type="submit" className="delete-btn">
                        <AiOutlineDelete className="delete-icon" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showCommentBox && (
            <form onSubmit={submitCommentHandler} className="comment-form">
              <textarea
                placeholder="Drop comments"
                className="comment-form-text"
                rows={10}
                onChange={(e) => {
                  setNewComment({
                    user_id: currentUser.id,
                    post_id: postId,
                    text: e.target.value,
                  });
                }}
              ></textarea>
              <div className="comment-form-subbtn-grp">
                <button type="submit" className="comment-form-submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="comment-form-submit-btn"
                  onClick={() => {
                    setShowCommentBox(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {!showCommentBox && (
            <form onSubmit={onCommentBtnClick}>
              <button type="submit" className="comment-btn">
                Make Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
