import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewUser, addNewUserToStorage } from '../store/postSlice';
import PostList from '../components/PostList';

import './Membership.css';

const userDirectory = {
  id: '',
  fullname: '',
  username: '',
  email: '',
  password: '',
  topic: '',
  intro: '',
  content: '',
  date: '',
  loggedIn: false,
};

const Membership = () => {
  const [showForm, setShowForm] = useState(true);

  const [newUser, setNewUser] = useState(userDirectory);

  const dispatch = useDispatch();

  const fullnameHandler = (e) => {
    setNewUser((prev) => ({ ...prev, fullname: e.target.value }));
  };

  const usernameHandler = (e) => {
    setNewUser((prev) => ({ ...prev, username: e.target.value }));
  };

  const emailHandler = (e) => {
    setNewUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordHandler = (e) => {
    setNewUser((prev) => ({
      ...prev,
      password: e.target.value,
      loggedIn: true,
    }));
  };

  const signUpFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewUser(newUser));
    dispatch(addNewUserToStorage());
    setNewUser((prev) => ({
      ...prev,
      fullname: '',
      username: '',
      email: '',
      password: '',
    }));
    newUser.loggedIn ? setShowForm(false) : setShowForm(true);
  };

  return (
    <div className="member">
      {showForm && (
        <form onSubmit={signUpFormHandler}>
          <p>Sign up using the form</p>
          <label htmlFor="fullname">
            Fullname
            <input
              type="text"
              id="fullname"
              placeholder="Enter your fullname"
              value={newUser.fullname}
              onChange={fullnameHandler}
            />
          </label>

          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={newUser.username}
              onChange={usernameHandler}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={emailHandler}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={passwordHandler}
            />
          </label>

          <button type="submit">Sign in with google</button>
        </form>
      )}

      {!showForm && <PostList />}
    </div>
  );
};

export default Membership;
