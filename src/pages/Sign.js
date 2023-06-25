import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { database } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// import { addNewUser, addNewUserToStorage } from '../store/postSlice';
// import Feeds from './Feeds';

import './Sign.css';

const userData = {
  firstname: '',
  lastname: '',
  displayName: '',
  role: '',
  email: '',
  password: '',
  confirmPassword: '',
  image: '',
  loggedIn: false,
  registrationDate: '',
};

const auth = getAuth();

const Sign = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const [userLogin, setUserLogIn] = useState(userData);
  const [loginError, setLoginError] = useState(false);

  const collectionRef = collection(database, 'users');

  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const showLoginForm = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const showRegisterForm = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const firstNameHandler = (e) => {
    setUserLogIn((prev) => ({ ...prev, firstname: e.target.value }));
  };

  const lastNameHandler = (e) => {
    setUserLogIn((prev) => ({ ...prev, lastname: e.target.value }));
  };

  const roleHandler = (e) => {
    setUserLogIn((prev) => ({ ...prev, role: e.target.value }));
  };

  const emailHandler = (e) => {
    setUserLogIn((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordHandler = (e) => {
    setUserLogIn((prev) => ({ ...prev, password: e.target.value.trim() }));
  };

  const confirmPasswordHandler = (e) => {
    setUserLogIn((prev) => ({
      ...prev,
      confirmPassword: e.target.value.trim(),
    }));
  };

  // HANDLE FORM FOR NEW REGISTRATION
  // WITH GOOGLE EMAIL/PASSWORD SIGN UP
  const signUpHandler = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      userLogin.email,
      userLogin.password
    );

    console.log(user);

    addDoc(collectionRef, {
      firstname: '',
      lastname: '',
      displayName: user.displayName,
      role: '',
      email: user.email,
      image: '',
      loggedIn: user.emailVerified,
      registrationDate: '',
    })
      .then(() => {
        alert('User created');
      })
      .catch((err) => {
        alert(err.message);
      });

    user && navigate('/feeds');
  };

  //WITH GOOGLE SIGN UP
  const googleSignUpHandler = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, provider);

    await addDoc(collectionRef, {
      firstname: '',
      lastname: '',
      displayName: user.displayName,
      role: '',
      email: user.email,
      image: '',
      loggedIn: user.emailVerified,
      registrationDate: '',
    })
      .then(() => {
        alert('User created');
      })
      .catch((err) => {
        alert(err.message);
      });

    user && navigate('/feeds');
  };

  // HANDLE FORM FOR EXISTING USERS
  const logInHandler = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        user && navigate('/feeds');
      })
      .catch((error) => {
        alert(error.code);
        // console.log(errorMessage);
      });
  };

  return (
    <div className="overlay">
      {/* {loginError && <p className="error">The passwords do not match</p>} */}
      {loginError && (
        <div className="error-message">
          <p>Please check the form!</p>
          <ul>
            <li>Make Sure the first name and last name fields are not empty</li>
            <li>Make Sure the email field is not empty</li>
            <li>Make Sure the two password fields are not empty & matches</li>
          </ul>
        </div>
      )}

      <div className="sign-in">
        <div className="sign-in-hero">
          <p className="chatter">CHATTER</p>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </div>
        <div className="sign-in-form">
          <div className="sign-in-form-nav">
            <h4
              className={showRegister ? 'blue-border' : 'grey-border'}
              onClick={showRegisterForm}
            >
              REGISTER
            </h4>
            <h4
              className={showLogin ? 'blue-border' : 'grey-border'}
              onClick={showLoginForm}
            >
              LOGIN
            </h4>
          </div>

          {!showLogin && showRegister && (
            <div className="sign-in-form-area">
              <h2>Register as a writer/reader</h2>
              <div className="name-field">
                <label className="first-name-label">
                  First name
                  <input
                    name="firstname"
                    type="text"
                    onChange={firstNameHandler}
                    value={userLogin.firstname}
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    onChange={lastNameHandler}
                    value={userLogin.lastname}
                  />
                </label>
              </div>

              <label>
                You are joining as?
                <select onChange={roleHandler}>
                  <option>Writer</option>
                  <option>Reader</option>
                </select>
              </label>
              <label>
                Email address
                <input
                  type="email"
                  onChange={emailHandler}
                  value={userLogin.email}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  onChange={passwordHandler}
                  value={userLogin.password}
                />
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  onChange={confirmPasswordHandler}
                  value={userLogin.confirmPassword}
                />
              </label>
              <button
                className="account-btn"
                type="submit"
                onClick={signUpHandler}
              >
                Create account
              </button>
              <button onClick={googleSignUpHandler} type="submit">
                Sign up with google
              </button>
              {/* <button>Sign up with LinkedIn</button> */}
            </div>
          )}

          {showLogin && !showRegister && (
            <form className="sign-in-form-area" onSubmit={logInHandler}>
              <h2>Welcome back</h2>
              <label>
                Email address
                <input type="email" onChange={emailHandler} />
              </label>
              <label>
                Password
                <input type="password" onChange={passwordHandler} />
              </label>
              <button className="account-btn">Log in</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sign;
