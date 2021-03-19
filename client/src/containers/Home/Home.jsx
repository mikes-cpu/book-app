import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import LandingBookCardList from "../../components/LandingBookCardList";
import Navbar from "../../components/Navbar/Navbar";
import SearchBox from "../../components/SearchBox.js/SearchBox";
import arrow from "../../img/arrow.png";
import "./Home.scss";

function Home({ apiResponse, setSearch }) {
  return (
    <>
      <div className="home">
        <div className="home__container">
          <div className="container__header">
            <h1>KOOB </h1>
            <h3>"START TAKING NOTES TODAY".</h3>
            <Navbar />
          </div>
          <div className="container__search-section">
            {/* <h4 className="search-section__header">SEARCH FOR BOOKS HERE!</h4> */}
            <SearchBox setSearch={setSearch} />
            <LandingBookCardList apiResponse={apiResponse} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
