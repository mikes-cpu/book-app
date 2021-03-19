import React from "react";
import LandingBookCard from "../LandingBookCard/LandingBookCard";
import "./LandingBookCardList.scss";

function LandingBookCardList({ apiResponse }) {
  return !apiResponse ? (
    <>
      <h4>YOUR SEARCH RESULTS WILL BE SHOWN HERE..</h4>
    </>
  ) : (
    <>
      <div className="landingBookCardList">
        <div className="landingBookCardList__container">
          {apiResponse.map((book) => (
            <>
              <LandingBookCard book={book} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default LandingBookCardList;
