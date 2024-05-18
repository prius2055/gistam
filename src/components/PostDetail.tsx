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
import { postComment } from '../store/commentSlice';
import { PostObj } from '../data/postData';

import './Post.css';
import { CommentType } from '../data/commentData';
import { getCurrentUser } from '../store/userSlice';
import Header from './Header';
import Navigation from './Navigation';

const PostDetail: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);

  const { post, isLoading, loadingError } = useAppSelector(
    (store) => store.posts
  );

  console.log(post);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState({
    user_id: 1,
    post_id: 1,
    text: '',
  });

  const param = useParams();
  const postId = Number(param.postId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getCurrentUser());
    dispatch(getContent(postId));
  }, [dispatch]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const { topic, content, post_image_url, posterDetail, created_at, comments } =
    post;

  const { firstname, lastname, id } = posterDetail;
  const authorName = firstname + ' ' + lastname;

  const commentsArray: CommentType[] = [...comments];

  const date = new Date(created_at);
  const createdDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const onCommentBtnClick = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (currentUser?.firstname) {
      setShowCommentBox(!showCommentBox);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (loadingError) {
    return <p>Unable to load post</p>;
  }

  return (
    <div>
      <Header />
      <div className="post-detail">
        {currentUser && <Navigation />}

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
            <h4>Comments ({commentsArray.length})</h4>
            {commentsArray.map((comment) => (
              <div className="comment">
                <p className="post-comments">{comment.text}</p>

                <div className="commenter">
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
              <button type="submit" className="comment-form-submit-btn">
                Submit
              </button>
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
