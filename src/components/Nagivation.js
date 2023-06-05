import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

export default function Nagivation() {
  const { posts } = useSelector((state) => state.post);

  const loggedInUser = posts.filter((post) => post.loggedIn);

  return (
    <div className="navigation-container">
      <NavLink to="/" className="logo">
        CHATTER
      </NavLink>

      <div className="navigation-group">
        {loggedInUser.length !== 0 &&
          loggedInUser.map((user) => (
            <nav className="navigation">
              <ul className="navbar">
                <li>
                  Welcome, <span>{user.fullname}</span>
                </li>
                <li>
                  <NavLink to="/newpost">Write a post</NavLink>
                </li>
              </ul>
              <button type="button">Sign out</button>
            </nav>
          ))}

        {loggedInUser.length === 0 && (
          <nav className="navigation">
            <div className="navbar">
              <div>
                {/* <NavLink to="/">About Chatter</NavLink> */}
                <NavLink to="/">
                  <h3>Overview</h3>
                </NavLink>
                <ul>
                  <li className="list-group">
                    <img src={feedImage} alt="feed" />
                    <li>Feed</li>
                  </li>
                  <li className="list-group">
                    <FontAwesomeIcon icon={faBookmark} />
                    <li>Bookmarks</li>
                  </li>
                  <li className="list-group">
                    <FontAwesomeIcon icon={faUserGroup} />
                    <li>Team blogs</li>
                  </li>
                  <li className="list-group">
                    <FontAwesomeIcon icon={faEnvelopeOpen} />
                    <li>Drafts</li>
                  </li>
                  <li className="list-group">
                    <img src={chartImage} alt="chart" />
                    <li>Analysis</li>
                  </li>
                </ul>
              </div>

              <div>
                {/* <NavLink to="/member">Become a member</NavLink> */}
                <NavLink to="/member" className='trending'>
                  <h3>Trending Tags</h3>
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
                {/* <NavLink to="/">About Chatter</NavLink> */}
                <NavLink to="/">
                  <h3> Personal</h3>
                </NavLink>
                <ul>
                  <li className="list-group">
                    <FontAwesomeIcon icon={faUser} />
                    <li>Account</li>
                  </li>
                  <li className="list-group">
                    <FontAwesomeIcon icon={faBell} />
                    <li>Notifications</li>
                  </li>
                  <li>
                    <li>Log Out</li>
                  </li>
                </ul>
              </div>
            </div>
            <button type="button">
              <NavLink to="/sign">Sign in</NavLink>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
