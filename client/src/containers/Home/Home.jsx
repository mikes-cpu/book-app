import { Link, navigate, Redirect, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import orangeHouseImg from "../../img/orange-house.png";
import axios from "axios";
import Alert from "../../components/Alert/Alert";

function Home({ jwt, setJwt, setUserID, userID, message, setMessage }) {
  // set user id
  const getCurrentUser = async () => {
    try {
      const currentUser = await axios.get("/api/user/authorise");
      console.log(currentUser);
      setUserID(currentUser.data.user.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const logoutHandler = async (e) => {
    // e.preventDefault();
    const cookie = await axios.get("/api/user/logout");
    console.log(cookie);
    setMessage("You have successfully logged out!");
    setTimeout(() => setMessage(""), 4500);
    setTimeout(() => {
      setJwt("");
    }, 4000);
  };

  useEffect(() => {
    if (!jwt) {
      navigate("/");
    }
  }, [jwt]);

  const [content, setContent] = useState("");

  useEffect(() => {
    updateMessage();
  }, [message]);

  const updateMessage = () => {
    let theMessage = message ? <Alert message={message} /> : "";
    setContent(theMessage);
  };

  //Stop being able to scroll
  useEffect(() => {
    const stopScroll = () => {
      window.addEventListener("scroll", () => {
        window.scrollTo(0, 0);
      });
    };
    stopScroll();
  });

  return (
    <>
      <div className="home">
        <div className="home__container">
          {content ? content : ""}
          <div className="container__header">
            <h1 className="header__header">HOME</h1>
            <h2 className="header__sub-header">"WELCOME TO SKOOB!</h2>
          </div>
          <Link to="/search" className="links__link links__search">
            <div className="container__mobile-search-button-container">
              <button className="mobile-search-button-container__mobile-search-button">
                BOOK SEARCH
              </button>
            </div>
          </Link>
          <div className="container__links">
            <div className="links__img-container">
              <img className="img-container__img" src={orangeHouseImg} alt="" />
            </div>
            <div className="links__links">
              <Link to="/read-books" className="links__link links__read">
                <p>READ</p>
              </Link>
              <Link to="/reading-books" className="links__link links__reading">
                <p>READING</p>
              </Link>
              <Link
                to="/want-to-books"
                className="links__link links__want-to-read"
              >
                <p>WANT TO READ</p>
              </Link>
              <Link to="/search" className="links__link links__search">
                <p>SEARCH</p>
              </Link>
              <p
                onClick={() => logoutHandler()}
                className="links__link links__logout"
              >
                LOGOUT
              </p>
            </div>
          </div>
          <div className="container__info">
            <h2 className="info__header">WHAT TO DO</h2>
            <h3 className="info__sub-header">STAGE 1</h3>
            <p className="info__text">
              Follow the search link to find your books.
            </p>
            <h3 className="info__sub-header">STAGE 2</h3>
            <p className="info__text">
              Add them to a the READ, READING or WANT TO READ list, using the
              buttons next to the search result.
            </p>
            <h3 className="info__sub-header">STAGE 3</h3>
            <p className="info__text">
              You can add notes to the books in your READ, or READING lists.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
