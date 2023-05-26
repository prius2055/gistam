import './SignIn.css';

export default function SignIn() {
  return (
    <div className="sign">
      <p>Sign in using the form</p>
      <form>
        <label htmlFor="username">
          Username
          <input type="text" id="username" placeholder="Enter username" />
        </label>
        <label htmlFor="username">
          Password
          <input type="text" id="password" placeholder="Enter password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
