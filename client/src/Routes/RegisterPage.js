import { useCallback, useEffect, useState } from "react";
import redX from "../images/red-x.png";
import { Link, useNavigate } from "react-router-dom";
import "./FormPage.css";
import axios from "axios";

const RegisterPage = (props) => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInputA, setPasswordInputA] = useState("");
  const [passwordInputB, setPasswordInputB] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordAError, setPasswordAError] = useState(null);
  const [passwordBError, setPasswordBError] = useState(null);
  const maxInput = 64;

  const handleUsernameChange = (e) => {
    const newInput = e.target.value;
    if (newInput.length > maxInput) {
      return;
    }
    setUsernameInput(newInput);
  };

  const handlePasswordAChange = (e) => {
    const newInput = e.target.value;
    if (newInput.length > maxInput) {
      return;
    }
    setPasswordInputA(newInput);
  };

  const handlePasswordBChange = (e) => {
    const newInput = e.target.value;
    if (newInput.length > maxInput) {
      return;
    }
    setPasswordInputB(newInput);
  };

  const checkIfPasswordsMatch = useCallback(() => {
    if (passwordInputA === passwordInputB) {
      return true;
    } else {
      return false;
    }
  }, [passwordInputA, passwordInputB]);

  //Regex courtesy of Stack Overflow
  const checkIfPasswordMeetsRequirements = useCallback(() => {
    const result = String(passwordInputA).match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  }, [passwordInputA]);

  const handleSubmit = async (e) => {
    try {
      let errorFound = false;
      if (!checkIfPasswordMeetsRequirements()) {
        setPasswordAError(
          `Password must have at least 6 characters, 1 number, 1 letter, ` +
            `and 1 special character`
        );
        errorFound = true;
      }
      if (!checkIfPasswordsMatch()) {
        setPasswordBError("Both passwords must match");
        errorFound = true;
      }
      if (usernameInput === "") {
        setUsernameError("This field is required");
        errorFound = true;
      }
      if (errorFound) {
        return;
      }
      const requestBody = {
        username: usernameInput,
        password: passwordInputA,
      };

      const response = await axios.post("/server-register", requestBody);

      navigate("/login");
      return response;
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data === "A user with that name already exists") {
        setUsernameInput("");
        setUsernameError("A user with that name already exists");

        return;
      }
      console.log(err);
      return err;
    }
  };

  //On load, redirect the user to their profile if they're already logged in
  useEffect(() => {
    const getAuthData = async () => {
      const response = await axios.get("/authenticated");
      if (response.data) {
        navigate(-1);
      }
    };
    getAuthData();
  }, [navigate]);

  useEffect(() => {
    const clearUsernameError = () => {
      setUsernameError(false);
    };

    const clearPasswordBError = () => {
      setPasswordBError(null);
    };

    const clearPasswordAError = () => {
      setPasswordAError(null);
    };
    if (usernameError) {
      if (usernameInput !== "") {
        clearUsernameError();
      }
    }
    if (passwordBError) {
      if (checkIfPasswordsMatch()) {
        clearPasswordBError();
      }
    }
    if (passwordAError) {
      if (checkIfPasswordMeetsRequirements()) {
        clearPasswordAError();
      }
    }
  }, [
    usernameError,
    passwordBError,
    passwordAError,
    checkIfPasswordsMatch,
    checkIfPasswordMeetsRequirements,
    usernameInput
  ]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <main className="container form-page">
      <div className="form-header-wrap styled-box">
        <h2>Create a new account</h2>
        <div className="form">
          <div className="input-item">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              onKeyUp={handleKeyPress}
              value={usernameInput}
              type="text"
              id="username"
              name="username"
              onChange={handleUsernameChange}
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
              value={passwordInputA}
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordAChange}
            />
            {passwordAError && (
              <div className="input-error-box">
                <img alt="error" src={redX} />
                <p>{passwordAError}</p>
              </div>
            )}
          </div>
          <div className="input-item">
            <label className="form-label" htmlFor="password-confirm">
              Confirm Password
            </label>
            <input
              className="form-control"
              onKeyUp={handleKeyPress}
              value={passwordInputB}
              type="password"
              id="password-confirm"
              name="password-confirm"
              onChange={handlePasswordBChange}
            />
            {passwordBError && (
              <div className="input-error-box">
                <img alt="error" src={redX} />
                <p>{passwordBError}</p>
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
        </div>
        <p className="form-page-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
