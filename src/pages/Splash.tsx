import React from 'react';
import './Splash.css';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const handleModalClose = () => {
    // console.log('clicked')
    navigate('/');
  };

  return (
    <div className="modal">
      <div className="splash">
        <h3 className="splash-title">Message</h3>
        <div className="splash-msg">
          <p>You have signed out!</p>
          <p>See you soon!</p>
        </div>

        <form onSubmit={handleModalClose}>
          <button className="splash-btn" type="submit">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Splash;
