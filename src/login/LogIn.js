import { useEffect, useState } from 'react';
import { setUser } from '../store/postSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Sign.css';

const userData = {
  firstname: '',
  lastname: '',
  role: '',
  email: '',
  image: '',
  loggedIn: false,
  registrationDate: '',
  userFeeds: [
    {
      feedId: 'post1',
      feedTopic: 'Software Engineering',
      feedIntro: 'Software...',
      feedDate: '',
      feedContent: {
        content: ' ',
        img: '',
        video: '',
      },
    },
  ],
};

// const auth = getAuth();

const LogIn = () => {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const [userLogin, setUserLogIn] = useState(userData);
  const [loginError, setLoginError] = useState(false);

  const [authUser, setAuthUser] = useState(null);

  const dispatch = useDispatch();

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
  const signUpHandler = (e) => {
    e.preventDefault();
  };

  //WITH GOOGLE SIGN UP
  const googleSignUpHandler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider);

    // await addDoc(collectionRef, {
    //   firstname: '',
    //   lastname: '',
    //   displayName: user.displayName,
    //   role: '',
    //   email: user.email,
    //   image: '',
    //   loggedIn: user.emailVerified,
    //   registrationDate: '',
    //   posts: [
    //     {
    //       postId: 'post1',
    //       topic: 'Software Engineering',
    //       intro: 'Software...',
    //       date: '',
    //       postContent: {
    //         content:
    //           'I want to start by saying that there is no bad programming language. Every programming language has a role and is very important to the applications the world uses daily. As some of the older programming languages are getting replaced by newer ones that are also much higher in demand, it makes more sense to focus on learning those. The cool thing about programming languages is that the basic syntax is usually the same. So once you have a solid understanding of one language, picking another language becomes much easier.',
    //         img: '',
    //         video: '',
    //       },
    //     },

    //     {
    //       postId: 'post2',
    //       topic: 'Digital marketing',
    //       intro: 'Digital marketing...',
    //       date: '',
    //       postContent: {
    //         content:
    //           'Firebase provides some great services like NoSQL databases, authentication, cloud storage, and much more. In this tutorial, we will learn how to use your React application to read and add data to your Firebase database.To demonstrate this, we will learn how to build a Todo app using React and Cloud Firestore (Firebase9 web SDK). Before we start building.',
    //         img: '',
    //         video: '',
    //       },
    //     },
    //   ],
    // })
    //   .then(() => {
    //     alert('User created');
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    // user && navigate('/feeds');
  };

  // HANDLE FORM FOR EXISTING USERS
  const logInHandler = async (e) => {
    e.preventDefault();
  };

  //AUTHENTICATE USER

  //   import { doc, updateDoc } from "firebase/firestore";

  // const washingtonRef = doc(db, "cities", "DC");

  // // Set the "capital" field of the city 'DC'
  // await updateDoc(washingtonRef, {
  //   capital: true
  // });

  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user);
  //       console.log(user.uid);
  //     } else {
  //       setAuthUser(null);
  //        console.log('not signed in');

  //     }
  //   });
  // }, [authUser, setAuthUser]);

  // ADD USER

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
            <NavLink
              to="/signup"
              className={showRegister ? 'blue-border' : 'grey-border'}
              onClick={showRegisterForm}
            >
              REGISTER
            </NavLink>
            <h4 className={showLogin ? 'blue-border' : 'grey-border'}>LOGIN</h4>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default LogIn;
