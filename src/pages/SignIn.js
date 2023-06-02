import { useState } from 'react';
import PostList from '../components/PostList';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig';

import './SignIn.css';

export default function SignIn() {
  // const [newUser, setNewUser] = useState(userDirectory);
  const [showForm, setShowForm] = useState(true);
  const [userLogin, setUserLogIn] = useState({});

  const provider = new GoogleAuthProvider();

  const signInFormHandler = (e) => {
    e.preventDefault();
    // setShowForm(false);
    signInWithPopup(auth, provider).then((data) =>
      setUserLogIn(data.user.email)
    );
    console.log(userLogin);
  };

  return (
    <div className="sign">
      {showForm && (
        <form onSubmit={signInFormHandler}>
          <p>Sign in using the form</p>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              // onChange={usernameHandler}
            />
          </label>
          <label htmlFor="username">
            Password
            <input
              type="text"
              id="password"
              placeholder="Enter password"
              // onChange={passwordHandler}
            />
          </label>
          <button type="submit">Sign in with google</button>
        </form>
      )}

      {!showForm && <PostList />}
    </div>
  );
}
