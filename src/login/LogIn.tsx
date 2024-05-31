import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sign.css';
import { UserLoginData, UistateVariables } from '../data/userData';
import axios from 'axios';

const LogIn: React.FC = () => {
  const navigate = useNavigate();

  const [uiState, setUiState] = useState<UistateVariables>({
    showLoginUi: true,
    showSignupUi: false,
    showLoadingUi: false,
    showLoginErrorUi: false,
  });

  const [userLogin, setUserLogIn] = useState<UserLoginData>({
    email: '',
    password: '',
  });

  const showLoginForm = () => {
    setUiState({ ...uiState, showLoginUi: true });
    setUiState({ ...uiState, showSignupUi: false });
  };

  const showRegisterForm = () => {
    setUiState({ ...uiState, showLoginUi: false });
    setUiState({ ...uiState, showSignupUi: true });
  };

  const login = async (userLogin: UserLoginData) => {
    try {
      setUiState({ ...uiState, showLoadingUi: true });
      const userObj = { user: userLogin };
      const response = await axios.post(
        'https://chatterapp-backend.onrender.com/login',
        userObj,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const user = await response.data;
      const { status } = user;

      if (status.code === 200) {
        const authorization = response.headers.authorization;
        localStorage.setItem('token', authorization);
        setUiState({ ...uiState, showLoadingUi: false });
        navigate('/posts');
      }
    } catch (error) {
      if (error) {
        setUiState({
          ...uiState,
          showLoginErrorUi: true,
          showLoadingUi: false,
        });
      }
    }
  };

  // HANDLE FORM FOR EXISTING USERS
  const logInHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const userInfo = {
      email: userLogin.email,
      password: userLogin.password,
    };

    login(userInfo);
    setUserLogIn({
      email: '',
      password: '',
    });
  };

  if (uiState.showLoadingUi) {
    <p>Signing in</p>;
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
          <p className='sign-in-hero-intro'>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </div>
        <div className="sign-in-form">
          <div className="sign-in-form-nav">
            <NavLink
              to="/signup"
              className={uiState.showSignupUi ? 'blue-border' : 'grey-border'}
              onClick={showRegisterForm}
            >
              REGISTER
            </NavLink>
            <h4
              className={uiState.showLoginUi ? 'blue-border' : 'grey-border'}
              onClick={showLoginForm}
            >
              LOGIN
            </h4>
          </div>
          <form className="sign-in-form-area" onSubmit={logInHandler}>
            <h2>Welcome back</h2>
            <label>
              Email address
              <input
                type="email"
                onChange={(e) => {
                  setUserLogIn((prev) => ({ ...prev, email: e.target.value }));
                }}
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
              />
            </label>
            <button className="account-btn">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
