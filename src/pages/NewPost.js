import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, addNewPostToStorage } from '../store/postSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPlus,
  faVideo,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PostList from '../components/PostList';

import './NewPost.css';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const newPostObj = {
  id: '',
  topic: '',
  content: '',
  imageFile: '',
  videoFile: '',
  previewImageURL: '',
  previewVideoURL: '',
};

const NewPost = () => {
  const [showOtherIcons, setShowOtherIcons] = useState(false);
  const [newPost, setnewPost] = useState(newPostObj);

  // const { posts } = useSelector((state) => state.post);
  // const dispatch = useDispatch();
  const hiddenFileImageInput = useRef();
  const hiddenFileVideoInput = useRef();

  // const loggedInUser = posts.filter((post) => post.loggedIn);

  const topicHandler = (e) => {
    e.preventDefault();
    setnewPost((prev) => ({
      ...prev,
      topic: e.target.value,
      id: loggedInUser[0].id,
    }));
  };

  const contentHandler = (e) => {
    setnewPost((prev) => ({
      ...prev,
      content: e.target.innerText,
    }));
  };

  const attachImageHandler = (e) => {
    e.preventDefault();
    hiddenFileImageInput.current.click();
  };

  const attachImageFunc = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setnewPost((prev) => ({
      ...prev,
      imageFile: file,
      previewImageURL: URL.createObjectURL(file),
    }));
  };

  const attachVideoHandler = (e) => {
    e.preventDefault();
    hiddenFileVideoInput.current.click();
  };

  const attachVideoFunc = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setnewPost((prev) => ({
      ...prev,
      videoFile: file,
      previewVideoURL: URL.createObjectURL(file),
    }));
  };

  const showOtherIconsHandler = () => {
    setShowOtherIcons(true);
  };

  const closeOtherIconsHandler = () => {
    setShowOtherIcons(false);
  };

  const submitPostHandler = (e) => {
    e.preventDefault();
    console.log(newPost);
    dispatch(addNewPost(newPost));
    dispatch(addNewPostToStorage(newPost));

    // setnewPost((prev) => ({
    //   ...prev,
    //   topic: '',
    //   content: '',
    // }));
  };

  return (
    <div className="new-post">
      <Navigation />
      <div className='main-post-grp'>
        <Header />
        <form className="form" onSubmit={submitPostHandler}>
          <button type="submit">
            <NavLink to="/">Publish</NavLink>
          </button>

          <div className="form-group">
            <div className="form-inputs">
              {!showOtherIcons && (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="form-icon"
                  onClick={showOtherIconsHandler}
                />
              )}

              {showOtherIcons && (
                <div className="form-attachment-group">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="form-icon icon-xmark"
                    onClick={closeOtherIconsHandler}
                  />
                  <FontAwesomeIcon
                    icon={faImage}
                    className="form-icon icon-image"
                    onClick={attachImageHandler}
                  />
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="form-icon icon-video"
                    onClick={attachVideoHandler}
                  />
                  <div className="form-attachments">
                    <input
                      type="file"
                      accept="image/*"
                      ref={hiddenFileImageInput}
                      onChange={attachImageFunc}
                    />
                    <input
                      type="file"
                      accept="video/*"
                      ref={hiddenFileVideoInput}
                      onChange={attachVideoFunc}
                    />
                  </div>
                </div>
              )}

              {!showOtherIcons && (
                <input
                  type="text"
                  placeholder="Title"
                  onChange={topicHandler}
                />
              )}
            </div>

            <div className='hidden-inputs'>
              {newPost.previewImageURL && (
                <img
                  src={newPost.previewImageURL}
                  width="300px"
                  alt="Image preview"
                />
              )}
              {newPost.previewVideoURL && (
                <video width="250" height="250" controls>
                  <source
                    src={newPost.previewVideoURL}
                    type={newPost.videoFile.type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              <textarea
                className="text-area"
                onInput={contentHandler}
                placeholder="Write a post..."
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
