import { Link, navigate, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import "./Landing.scss";
import corner1 from "../../img/top-right.png";
import corner2 from "../../img/bottom-right.png";
import axios from "axios";
import Alert from "../../components/Alert/Alert";

function Landing({ jwt, getJwtAuth, setUserID, message, setMessage }) {
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

  // login button click
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      const login = await axios.post("/api/user/login", user);
      console.log(login.data);
      setUserID(login.data.user);
      getJwtAuth();
    } catch (error) {
      setMessage("Either Email or Password was entered incorrectly");
      setTimeout(() => setMessage(""), 5000);
    }
  };

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
      <div className="landing">
        <div className="landing__container">
          {content ? content : ""}
          <div className="container__header">
            <h3 className="header__sub-header">
              "REMEMBER THE BOOKS IMPORTANT TO YOU!"
            </h3>
            <h1 className="header__header">SKOOB</h1>
          </div>
          <div className="container__login">
            <h3 className="login__header">LOGIN</h3>
            <form className="login__form">
              <label className="login__lable" htmlFor="">
                E-MAIL
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="login__input"
                type="email"
                name="email"
              />
              <label className="login__lable" htmlFor="">
                PASSWORD
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="login__input"
                type="password"
                name="password"
              />
              <button onClick={handleClick} className="login__button">
                SUBMIT
              </button>
            </form>
            <button
              onClick={() => navigate("/signup")}
              className="container__sign-up-button"
            >
              SIGN UP
            </button>
          </div>
          <img className="container__corner-top" src={corner1} alt="" />
          <img className="container__corner-bottom" src={corner2} alt="" />
        </div>
      </div>
    </>
  );
}

export default Landing;
