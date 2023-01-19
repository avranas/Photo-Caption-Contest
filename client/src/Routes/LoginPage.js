import redX from "../images/red-x.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FormPage.css";
import axios from "axios";
/*
  Next tells the login page where to navigate to after a successful login
  Error is a code that tells the login page what error page to display to a user
*/
const LoginPage = (props) => {
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidLoginError, setInvalidLoginError] = useState("");

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    try {
      let errorFound = false;
      if (usernameInput === "") {
        setUsernameError("This field is required");
        errorFound = true;
      }
      if (passwordInput === "") {
        setPasswordError("This field is required");
        errorFound = true;
      }
      if (errorFound) {
        return;
      }
      const requestBody = {
        username: usernameInput,
        password: passwordInput,
      };
      await axios.post("/server-login", requestBody);
      //If the passwords don't match, an error will be thrown
      const userData = await axios("/users/current");
      props.setUsername(userData.data.username);
      navigate("/caption-page/1");
    } catch (err) {
      console.log(err);
      if (err.response.data === "You need to be logged out do that.") {
        setInvalidLoginError("You are already logged in!");
      } else if (err.response.data === "Unauthorized") {
        setInvalidLoginError("Username or password was incorrect!");
        setPasswordInput("");
      }
      console.log(err);
    }
  };

  //Navigate to the home page if you're already logged in
  useEffect(() => {
    const checkNotAuthenticated = async () => {
      const response = axios("/authenticated");
      if (response.data) {
        navigate("/");
      }
    };
    checkNotAuthenticated();
  }, [navigate]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <main className="container form-page form-header-wrap styled-box">
      <h2>Login</h2>
      <div className="form">
        <div className="input-item">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={usernameInput}
            onChange={handleUsernameChange}
            onKeyUp={handleKeyPress}
          />
          {usernameError && (
            <div className="input-error-box">
              <img alt="error" src={redX} />
              <p>{usernameError}</p>
            </div>
          )}
        </div>
        <div className="input-item">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            onKeyUp={handleKeyPress}
            type="password"
            id="password"
            name="password"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <div className="input-error-box">
              <img alt="error" src={redX} />
              <p>{passwordError}</p>
            </div>
          )}
        </div>
        <div className="form-break"></div>
        <button
          className="important-button"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {invalidLoginError && (
          <div className="input-error-box">
            <img alt="error" src={redX} />
            <p>{invalidLoginError}</p>
          </div>
        )}
      </div>
      <p className="form-page-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default LoginPage;
