import React, { useEffect, useState } from "react";
import "./Signup.scss";
import clickIcon from "../../img/click-icon-blue.png";
import { navigate, Redirect, redirectTo, useLocation } from "@reach/router";
import axios from "axios";
import Alert from "../../components/Alert/Alert";

function Signup({ setJwt, jwt, getJwtAuth, setUserID, message, setMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate to home if there is a valid token upon opening landing page (logged in)
  useEffect(() => {
    getJwtAuth();
  }, []);

  // navigate to home as soon as there is a valid token, (logged in)
  useEffect(() => {
    if (jwt) {
      navigate("/home");
    }
  }, [jwt]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name,
        email,
        password,
      };
      const register = await axios.post("/api/user/register", user);
      console.log(register.data);
      setUserID(register.data.user);
      getJwtAuth();
    } catch (err) {
      console.log(err.response.data.map((error) => error));
      setMessage(err.response.data[0]);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  // prevents zooming in on search bar
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [content, setContent] = useState("");

  useEffect(() => {
    updateMessage();
  }, [message]);

  const updateMessage = () => {
    let theMessage = message ? <Alert message={message} /> : "";
    setContent(theMessage);
  };

  return (
    <>
      <div className="signup">
        <div className="signup__container">
          {content ? content : ""}
          <div className="container__header">
            <h1 className="header__header header__sign">SIGN</h1>
            <h1 className="header__header header__up">UP</h1>
          </div>
          <div className="container__signup-section">
            <h3 className="signup-section__header">SIGN UP</h3>
            <form className="signup-section__form">
              <label className="signup-section__lable" htmlFor="">
                USERNAME
              </label>
              <input
                className="signup-section__input"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="signup-section__lable" htmlFor="">
                E-MAIL
              </label>
              <input
                className="signup-section__input"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="signup-section__lable" htmlFor="">
                PASSWORD
              </label>
              <input
                className="signup-section__input"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                onClick={onSubmit}
                className="signup-section__button"
              >
                SUBMIT
              </button>
            </form>
          </div>
          <button
            onClick={() => navigate("/")}
            className="container__back-to-login-button"
          >
            BACK TO LOGIN{" "}
            <img className="back-to-login-button__img" src={clickIcon}></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
