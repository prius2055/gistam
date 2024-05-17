import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPlus,
  faVideo,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PostList from '../components/PostList';

import './NewPost.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { NewPostObj, PostFileFormData } from '../data/postData';

const NewPost: React.FC = () => {
  const { currentUser, isLoading, loadingError } = useAppSelector(
    (store) => store.users
  );


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loadingState, setLoadingState] = useState(false);
  const [showOtherIcons, setShowOtherIcons] = useState(false);
  const [formData, setFormData] = useState<NewPostObj>({
    user_id: currentUser.id,
    topic: '',
    content: '',
    // author_name: authorName,
    post_image: '',
    // videoFile: {},
    // previewImageURL: '',
    // previewVideoURL: '',
  });

  const hiddenFileImageInput = useRef<HTMLInputElement | null>(null);
  const hiddenFileVideoInput = useRef<HTMLInputElement | null>(null);


  const attachImageHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    hiddenFileImageInput.current?.click();
  };

  // const attachImageFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const file = e.target.files?.[0].name;
  //   console.log(typeof file);

  //   if (file) {
  //     setnewPost((prev) => ({
  //       ...prev,
  //       post_image: file,
  //       // previewImageURL: URL.createObjectURL(file),
  //     }));
  //   } else {
  //     // Handle case where no file is selected
  //     setnewPost((prev) => ({
  //       ...prev,
  //       post_image: '', // Set a default value or handle as needed
  //     }));
  //   }
  // };

  // const attachVideoHandler = (e: React.FormEvent<EventTarget>) => {
  //   e.preventDefault();
  //   hiddenFileVideoInput.current?.click();
  // };

  // const attachVideoFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  //   const file = e.target.files?.[0];

  //   if (file) {
  //     setnewPost((prev) => ({
  //       ...prev,
  //       videoFile: file,
  //       previewImageURL: URL.createObjectURL(file),
  //     }));
  //   } else {
  //     // Handle case where no file is selected
  //     setnewPost((prev) => ({
  //       ...prev,
  //       videoFile: '', // Set a default value or handle as needed
  //     }));
  //   }
  // };

  const showOtherIconsHandler = () => {
    setShowOtherIcons(true);
  };

  const closeOtherIconsHandler = () => {
    setShowOtherIcons(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        post_image: files,
      }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);

    const data = new FormData();

    data.append('post[user_id]', formData.user_id);
    data.append('post[topic]', formData.topic);
    data.append('post[content]', formData.content);
    data.append('post[post_image]', formData.post_image[0]);

    console.log(formData);

    const authToken = localStorage.getItem('token');

    console.log(data);

    fetch(`http://localhost:3001/api/v1/posts`, {
      method: 'POST',
      headers: {
        authorization: `${authToken}`,
      },
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          setLoadingState(false);
          navigate('/posts');
        }
      })
      .catch((error) => {
        console.log(`something went wrong ${error}`);
      });

    setFormData((prev) => ({
      ...prev,
      topic: '',
      content: '',
    }));
  };

  if (loadingState) {
    return <p>loading</p>;
  }

  if (!currentUser.firstname) {
    return <Navigate to="/posts" replace />;
  }

  return (
    <div className="new-post">
      <Navigation />
      <div className="main-post-grp">
        <Header />
        <form className="form" onSubmit={handleFormSubmit}>
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
                    // onClick={attachVideoHandler}
                  />
                  <div className="form-attachments">
                    <input
                      name="photo_image"
                      type="file"
                      accept="image/*"
                      // multiple
                      ref={hiddenFileImageInput}
                      onChange={handleImageInputChange}
                    />
                    <input
                      type="file"
                      name="video"
                      accept="video/*"
                      ref={hiddenFileVideoInput}
                    />
                  </div>
                </div>
              )}

              {!showOtherIcons && (
                <label htmlFor="topic">
                  <input
                    id="topic"
                    type="text"
                    placeholder="Topic"
                    name="topic"
                    onChange={handleInputChange}
                  />
                </label>
              )}
            </div>

            <div className="hidden-inputs">
              {/* {newPost.previewImageURL && (
                <img
                  src={newPost.previewImageURL}
                  width="300px"
                  alt="Image preview"
                />
              )} */}
              {/* {newPost.previewVideoURL && (
                <video width="250" height="250" controls>
                  <source src={newPost.previewVideoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )} */}
              <label htmlFor="content">
                <textarea
                  id="content"
                  name="content"
                  className="text-area"
                  placeholder="Write a post..."
                  onChange={handleInputChange}
                ></textarea>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
