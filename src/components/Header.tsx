import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CgProfile } from 'react-icons/cg';

import './Header.css';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../store/userSlice';

const Header: React.FC = () => {
  const { currentUser, isLoading, loadingError } = useAppSelector(
    (store) => store.users
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="header">
      <div className="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="header-icons" />
        <input type="text" placeholder="Search here" />
      </div>
      <div className="profile">
        <span>
          {currentUser?.firstname ? (
            `Hi ${currentUser.firstname}`
          ) : (
            <div className="header-buttons">
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/signup" className="btn-blue">
                Sign up
              </NavLink>
            </div>
          )}
        </span>

        {currentUser?.firstname ? <CgProfile className="profile-image" /> : ''}
        {currentUser?.firstname ? (
          <FontAwesomeIcon icon={faBell} className="header-icons" />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Header;
