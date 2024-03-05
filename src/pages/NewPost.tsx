import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addNewPost, addNewPostToStorage } from '../store/postSlice';
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

type NewPostObj = {
  id: string;
  topic: string;
  content: string;
  imageFile: object | string;
  videoFile: object | string;
  previewImageURL: string;
  previewVideoURL: string;
};

const NewPost: React.FC = () => {
  const [showOtherIcons, setShowOtherIcons] = useState(false);
  const [newPost, setnewPost] = useState<NewPostObj>({
    id: '',
    topic: '',
    content: '',
    imageFile: {},
    videoFile: {},
    previewImageURL: '',
    previewVideoURL: '',
  });

  // const { posts } = useSelector((state) => state.post);
  // const dispatch = useDispatch();
  const hiddenFileImageInput = useRef<HTMLInputElement | null>(null);
  const hiddenFileVideoInput = useRef<HTMLInputElement | null>(null);

  // const loggedInUser = posts.filter((post) => post.loggedIn);

  const attachImageHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    hiddenFileImageInput.current?.click();
  };

  const attachImageFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      setnewPost((prev) => ({
        ...prev,
        imageFile: file,
        previewImageURL: URL.createObjectURL(file),
      }));
    } else {
      // Handle case where no file is selected
      setnewPost((prev) => ({
        ...prev,
        imageFile: '', // Set a default value or handle as needed
      }));
    }
  };

  const attachVideoHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    hiddenFileVideoInput.current?.click();
  };

  const attachVideoFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      setnewPost((prev) => ({
        ...prev,
        videoFile: file,
        previewImageURL: URL.createObjectURL(file),
      }));
    } else {
      // Handle case where no file is selected
      setnewPost((prev) => ({
        ...prev,
        videoFile: '', // Set a default value or handle as needed
      }));
    }
  };

  const showOtherIconsHandler = () => {
    setShowOtherIcons(true);
  };

  const closeOtherIconsHandler = () => {
    setShowOtherIcons(false);
  };

  const submitPostHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(newPost);
    // dispatch(addNewPost(newPost));
    // dispatch(addNewPostToStorage(newPost));

    setnewPost((prev) => ({
      ...prev,
      topic: '',
      content: '',
    }));
  };

  return (
    <div className="new-post">
      <Navigation />
      <div className="main-post-grp">
        <Header />
        <form className="form" onSubmit={submitPostHandler}>
          <button type="submit">Publish</button>

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
                      multiple
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
                  value={newPost.topic}
                  placeholder="Title"
                  onChange={(e) =>
                    setnewPost((prev) => ({
                      ...prev,
                      topic: e.target.value,
                      // id: loggedInUser[0].id,
                    }))
                  }
                />
              )}
            </div>

            <div className="hidden-inputs">
              {newPost.previewImageURL && (
                <img
                  src={newPost.previewImageURL}
                  width="300px"
                  alt="Image preview"
                />
              )}
              {newPost.previewVideoURL && (
                <video width="250" height="250" controls>
                  <source src={newPost.previewVideoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <textarea
                value={newPost.content}
                className="text-area"
                onChange={(e) =>
                  setnewPost((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
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
