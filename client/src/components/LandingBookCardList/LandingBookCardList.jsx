import React from "react";
import LandingBookCard from "../LandingBookCard/LandingBookCard";
import "./LandingBookCardList.scss";

function LandingBookCardList({ apiResponse }) {
  return !apiResponse ? (
    <>
      <h1>Please enter something...</h1>
    </>
  ) : (
    <>
      <div className="landingBookCardList">
        <div className="landingBookCardList__container">
          {apiResponse.map((book) => (
            <LandingBookCard book={book} />
          ))}
        </div>
      </div>
    </>
  );
}

export default LandingBookCardList;
