import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./authForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async e => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateName = e => {
    setName(e.target.value);
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = e => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="split-width-signup">
      <div id="left-split-signup">
        <form id="login-form-signup" onSubmit={onSignUp}>
          <h2 id="signup-heading">Make Your Money Moon</h2>
          <h4>
            To the Moon lets you invest in companies you love, with money that
            isn't real.
          </h4>
          <h6>
            Please enter your full legal name. Or a fake name, it's entirely up
            to you.
          </h6>

          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label>Name</label> */}
            <input
              type="text"
              name="name"
              onChange={updateName}
              value={name}
              placeholder="Name"
              className="signup-input"
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Email"
              className="signup-input"
            ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
              className="signup-input"
            ></input>
          </div>
          <div>
            {/* <label>Repeat Password</label> */}
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder="Confirm Password"
              className="signup-input"
            ></input>
          </div>
          <div id="signup-form-bottom">
            <button id="login-button" type="submit">
              Continue
            </button>
            <p>Already on To the Moon?</p>
            <a id="create-account-link" href="/login">
              Log in
            </a>
          </div>
        </form>
        <div id="diclaimer-box">
          <p id="signup-disclaimer-top" className="signup-disclaimer">
            All investments involve risk, including the possible loss of
            principal. Investors should consider their investment objectives and
            risks carefully before investing.
          </p>
          <p className="signup-disclaimer">
            Commission-free trading means $0 commission trading on self-directed
            individual cash or margin brokerage accounts that trade U.S. listed
            securities via mobile devices or web. Keep in mind, other fees such
            as trading (non-commission) fees, Gold subscription fees, wire
            transfer fees, and paper statement fees may apply to your brokerage
            account. Please see To the Moon Financial’s fee schedule to learn
            more.
          </p>
          <p className="signup-disclaimer">
            Securities trading offered through To the Moon Financial LLC.
            Brokerage clearing services offered through To the Moon Securities,
            LLC. Both are subsidiaries of To the Moon Markets, Inc.
          </p>

          <p className="signup-disclaimer" id="signup-green-text">
            Check the background of To the Moon Financial LLC and To the Moon
            Securities, LLC on FINRA’s BrokerCheck.
          </p>

          <p className="signup-disclaimer" id="signup-green-text">
            To the Moon Terms & Conditions Disclosure Library Contact Us FAQ
          </p>
          <p className="signup-disclaimer">
            © 2020 To the Moon. All rights reserved.
          </p>
        </div>
      </div>
      <div id="right-split-signup">
        <div>
          <h6>Commission-free trading</h6>
          <p>
            Break free from commission-fees and make unlimited commission-free
            trades in stocks, funds, and options with Robinhood Financial. Other
            fees may apply. View our fee schedule to learn more.
          </p>
        </div>
        <div>
          <h6>Account Protection</h6>
          <p>
            Robinhood Financial is a member of SIPC. Securities in your account
            protected up to $500,000. For details, please see www.sipc.org.
          </p>
        </div>
        <div>
          <h6>Stay on top of your portfolio</h6>
          <p>
            Set up customized news and notifications to stay on top of your
            assets as casually or as relentlessly as you like. Controlling the
            flow of info is up to you.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUpForm;
