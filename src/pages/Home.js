import { useState } from 'react';
// import PostList from '../components/PostList';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig';
import AboutImage from '../img/about-hero.png';
import AnalyticsImage from '../img/carbon_analytics.png';
import SocialImage from '../img/people.png';
import ContentImage from '../img/content.png';
import TestimonialImage1 from '../img/testimonial-1.png';
import TestimonialImage2 from '../img/testimonial-2.png';
import TestimonialImage3 from '../img/testimonial3.jpg';
import TestimonialImage4 from '../img/testimonial-4.jpg';

import './Home.css';

export default function Home() {
  // const [newUser, setNewUser] = useState(userDirectory);
  const [showForm, setShowForm] = useState(true);
  const [userLogin, setUserLogIn] = useState({});

  // const provider = new GoogleAuthProvider();

  const signInFormHandler = (e) => {
    e.preventDefault();
    // setShowForm(false);
    signInWithPopup(auth, provider).then((data) =>
      setUserLogIn(data.user.email)
    );
    console.log(userLogin);
  };

  return (
    <div className="home">
      <div className="landing-page">
        <header>
          <h1>CHATTER</h1>
          <ul>
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blogs</a>
            </li>
          </ul>
          <div className="header-buttons">
            <button type="button">Log in</button>
            <button type="button">Sign up</button>
          </div>
        </header>
        <section id="hero">
          <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
          <p>
            Unleash the power of words, connect with like-minded readers and
            writers
          </p>
          <button type="button">Get started</button>
        </section>
        <section id="about">
          <div className="about-top">
            <div className="about-chatter">
              <h2>About Chatter</h2>
              <p>
                Chatter is a multi-functional platform where authors and readers
                can have access to their own content. It aims to be a
                traditional bookworm’s heaven and a blog to get access to more
                text based content. Our vision is to foster an inclusive and
                vibrant community where diversity is celebrated. We encourage
                open-mindedness and respect for all individuals, regardless of
                their backgrounds or beliefs. By promoting dialogue and
                understanding, we strive
              </p>
            </div>
            <img src={AboutImage} alt="about image" />
          </div>
          <div className="about-bottom">
            <h2>Why you should join chatter</h2>
            <p>
              Our goal is to make writers and readers see our platform as their
              next heaven for blogging, ensuring ease in interactions,
              connecting with like-minded peers, have access to favorite content
              based on interests and able to communicate your great ideas with
              people
            </p>
            <div className="about-cards">
              <div className="card">
                <img src={AnalyticsImage} alt="analytics" />
                <h3>Analytics</h3>
                <p>
                  Analytics to track the number of views, likes and comment and
                  also analyze the performance of your articles over a period of
                  time
                </p>
              </div>

              <div className="card">
                <img src={SocialImage} alt="social interactions" />
                <h3>Social interactions</h3>
                <p>
                  Users on the platform can interact with posts they like,
                  comment and engage in discussions
                </p>
              </div>

              <div className="card">
                <img src={ContentImage} alt="content creation" />
                <h3>Content creation</h3>
                <p>
                  Write nice and appealing with our in-built markdown, a rich
                  text editor
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials">
          <div className="testimonial-top">
            <img src={TestimonialImage1} alt="first testimonial image" />
            <div className="testimonial-top-note">
              <p>
                "Chatter has become an integral part of my online experience. As
                a user of this incredible blogging platform, I have discovered a
                vibrant community of individuals who are passionate about
                sharing their ideas and engaging in thoughtful discussions.”
              </p>
              <h4>
                Adebobola Muhydeen, <span>Software developer at Apple</span>
              </h4>
              <button type="button">Join chatter</button>
            </div>
          </div>
          <div className="testimonial-bottom">
            <div className="testimonial-bottom-images">
              <div className="bottom-image-group">
                <img src={TestimonialImage2} alt="second testimonial image" />
                <img
                  src={TestimonialImage3}
                  alt="third testimonial image"
                  width="250px"
                  height="250px"
                />
              </div>
              <img
                src={TestimonialImage4}
                alt="fourth testimonial image"
                width="250px"
                height="250px"
              />
            </div>
            <div className="testimonial-bottom-note">
              <h2>Write, read and connect with great minds on chatter</h2>
              <p>
                Share people your great ideas, and also read write-ups based on
                your interests. connect with people of same interests and goals
              </p>
              <button type="button">Get started</button>
            </div>
          </div>
        </section>
        <section id="contact">
          <h1>CHATTER</h1>
          
        </section>
      </div>

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

      {/* {!showForm && <PostList />} */}
    </div>
  );
}
