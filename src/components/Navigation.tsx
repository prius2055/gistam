import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faEnvelopeOpen,
  faUser,
  faBell,
} from '@fortawesome/free-regular-svg-icons';
import { faUserGroup, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import feedImage from '../img/feed.png';
import chartImage from '../img/chart.png';
import './Navigation.css';
import axios from 'axios';
import { clearCurrentUser } from '../store/userSlice';
import { RxCross2 } from 'react-icons/rx';
import { hideNavigation } from '../store/postSlice';

const Navigation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);
    const authToken = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        'https://chatterapp-backend.onrender.com/logout',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
          },
        }
      );
      const user = await response.data;
      const { status } = user;

      console.log(status);

      if (status === 200) {
        setLoading(false);
        dispatch(clearCurrentUser());
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCloseNavigation = () => {
    dispatch(hideNavigation());
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <nav className="navigation">
      <div className="navbar">
        <div>
          <h3>Overview</h3>
          <ul>
            <NavLink to="/posts" className="list-group">
              <img src={feedImage} alt="feed" />
              <p>Posts</p>
            </NavLink>
            <li className="list-group">
              <FontAwesomeIcon icon={faBookmark} />
              <p>Bookmarks</p>
            </li>
            <li className="list-group">
              <FontAwesomeIcon icon={faUserGroup} />
              <p> Team blogs</p>
            </li>
            <li className="list-group">
              <FontAwesomeIcon icon={faEnvelopeOpen} />
              <p>Drafts</p>
            </li>
            <li className="list-group">
              <img src={chartImage} alt="chart" />
              <p>Analysis</p>
            </li>
          </ul>
        </div>

        <div>
          <NavLink to="/member" className="trending">
            <h3>Trending</h3>
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </NavLink>

          <ul className="trending-list">
            <li>Programming</li>
            <li>Data science</li>
            <li>Technology</li>
            <li>Machine learning</li>
            <li>Politics</li>
            <li>See all</li>
          </ul>
        </div>
        <div>
          <h3> Personal</h3>
          <ul>
            <li className="list-group">
              <FontAwesomeIcon icon={faUser} />
              <p> Account</p>
            </li>
            <li className="list-group">
              <FontAwesomeIcon icon={faBell} />
              <p> Notifications</p>
            </li>
            <form onSubmit={handleLogout}>
              <button type="submit">Log Out</button>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
