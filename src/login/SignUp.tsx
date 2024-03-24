import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../store/hooks';
// import { postUser } from '../store/userSlice';
import { UserSignUpData, UistateVariables } from '../data/userData';
import './Sign.css';
import axios from 'axios';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [uiState, setUiState] = useState<UistateVariables>({
    showLoginUi: false,
    showSignupUi: true,
    showLoadingUi: false,
    showLoginErrorUi: false,
  });

  const [userLogin, setUserLogIn] = useState<UserSignUpData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    // image: '',
  });

  // const [authUser, setAuthUser] = useState(null);

  // const dispatch = useAppDispatch();

  const showLoginForm = () => {
    setUiState({ ...uiState, showLoginUi: true, showSignupUi: false });
  };

  const showRegisterForm = () => {
    setUiState({ ...uiState, showLoginUi: false, showSignupUi: true });
  };

  const createNewUser = async (userInfo: UserSignUpData) => {
    try {
      setUiState({ ...uiState, showLoadingUi: true });
      const userObject = { user: userInfo };
      const authToken = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/signup',
        userObject,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: authToken,
          },
        }
      );
      const user = await response.data;
      const { status } = user;
      if (status.code === 200) {
        setUiState({ ...uiState, showLoadingUi: false });
        navigate('/feeds');
      }
    } catch (error) {
      if (error) {
        setUiState({
          ...uiState,
          showLoadingUi: false,
          showLoginErrorUi: true,
        });
      }
    }
  };

  const logInHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const userInfo = {
      firstname: userLogin.firstname,
      lastname: userLogin.lastname,
      email: userLogin.email,
      password: userLogin.password,
      confirmPassword: userLogin.confirmPassword,
    };

    createNewUser(userInfo);
    setUserLogIn({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (uiState.showLoadingUi) {
    return <p>Signing in</p>;
  }

  return (
    <div className="overlay">
      {uiState.showLoginErrorUi && (
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
              className={uiState.showSignupUi ? 'blue-border' : 'grey-border'}
              onClick={showRegisterForm}
            >
              REGISTER
            </h4>
            <NavLink
              to="/login"
              className={uiState.showLoginUi ? 'blue-border' : 'grey-border'}
              onClick={showLoginForm}
            >
              LOGIN
            </NavLink>
          </div>
          <div className="sign-in-form-area">
            <h2>Register as a writer/reader</h2>

            <form onSubmit={logInHandler}>
              <div className="name-field">
                <label className="first-name-label">
                  First name
                  <input
                    name="firstname"
                    type="text"
                    onChange={(e) => {
                      setUserLogIn((prev) => ({
                        ...prev,
                        firstname: e.target.value,
                      }));
                    }}
                    value={userLogin.firstname}
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    onChange={(e) => {
                      setUserLogIn((prev) => ({
                        ...prev,
                        lastname: e.target.value,
                      }));
                    }}
                    value={userLogin.lastname}
                  />
                </label>
              </div>

              <label>
                You are joining as?
                <select
                  onChange={(e) => {
                    setUserLogIn((prev) => ({ ...prev, role: e.target.value }));
                  }}
                >
                  <option>Writer</option>
                  <option>Reader</option>
                </select>
              </label>
              <label>
                Email address
                <input
                  type="email"
                  onChange={(e) => {
                    setUserLogIn((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  value={userLogin.email}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  onChange={(e) => {
                    setUserLogIn((prev) => ({
                      ...prev,
                      password: e.target.value.trim(),
                    }));
                  }}
                  value={userLogin.password}
                />
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  onChange={(e) => {
                    setUserLogIn((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value.trim(),
                    }));
                  }}
                  value={userLogin.confirmPassword}
                />
              </label>
              <button className="account-btn" type="submit">
                Create account
              </button>
            </form>

            {/* <button onClick={googleSignUpHandler} type="submit">
              Sign up with google
            </button> */}
            {/* <button>Sign up with LinkedIn</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
