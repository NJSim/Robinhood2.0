import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./authForm.css";
import image from "./Robinhood-login-image.jpeg";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="split-width">
      <div id="left-split">
        <img id="login-picture" src={image} />
      </div>
      <div id="right-split">
        <form id="login-form" onSubmit={onLogin}>
          <h2>Welcome To the Moon</h2>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <div>
            <input
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              className="auth-input"
            />
          </div>
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div>
            <input
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              className="auth-input"
            />
          </div>
          <div id="login-form-bottom">
            <button id="login-button" type="submit">
              Sign in
            </button>
            <p>Not on To the Moon?</p>
            <a id="create-account-link" href="/signup">
              create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
