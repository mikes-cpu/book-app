import { Link, navigate, Redirect } from "@reach/router";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import orangeHouseImg from "../../img/orange-house.png";
import axios from "axios";

function Home({ jwt, setJwt, setUserID, userID }) {
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
    setJwt("");
  };

  useEffect(() => {
    if (!jwt) {
      navigate("/");
    }
  }, [jwt]);

  return (
    <>
      <div className="home">
        <div className="home__container">
          <div className="container__header">
            <h1 className="header__header">HOME</h1>
            <h2 className="header__sub-header">"WELCOME TO SKOOB!</h2>
          </div>
          <div className="container__mobile-search-button-container">
            <Link to="/search" className="links__link links__search">
              <button className="mobile-search-button-container__mobile-search-button">
                BOOK SEARCH
              </button>
            </Link>
          </div>
          <div className="container__links">
            <img className="links__img" src={orangeHouseImg} alt="" />
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
