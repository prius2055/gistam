import React from 'react';
import './Membership.css';

const Membership = () => (
  <div className="member">
    <p>Sign up using the form</p>
    <form>
      <label htmlFor="fullname">
        Fullname
        <input type="text" id="fullname" placeholder="Enter your fullname" />
      </label>

      <label htmlFor="username">
        Username
        <input type="text" id="username" placeholder="Enter username" />
      </label>

      <label htmlFor="email">
        Email
        <input type="email" id="email" placeholder="Enter email" />
      </label>

      <label htmlFor="password">
        Password
        <input type="password" id="password" placeholder="Enter password" />
      </label>

      <button type="submit">Sign in</button>
    </form>
  </div>
);

export default Membership;
