import React from "react";
import BookCardList from "../BookCardList";
import SearchBox from "../SearchBox.js/SearchBox";
import "./SectionLayout1.scss";

function SectionLayout1({ setSearch, apiResponse }) {
  return (
    <>
      <div className="sectionLayout1">
        <div className="sectionLayout1__container">
          <div className="container__header">
            <h1>KOOB</h1>
            <p>“DON’T FORGET WHAT YOU’VE READ. NOTE IT DOWN USING KOOB.”</p>
          </div>
          <div className="container__main">
            <div className="main__search">
              <h2>SEARCH</h2>
              <SearchBox setSearch={setSearch} />
            </div>
            <div className="main__user">
              <h2>OR SIGN IN</h2>
              <form action="">
                <label>USERNAME</label>
                <input type="text" />
                <label>PASSWORD</label>
                <input type="password" />
                <button>SUBMIT</button>
                <button>GOOGLE LOGIN</button>
                <button>MAKE AN ACCOUNT HERE</button>
              </form>
            </div>
          </div>
          <BookCardList apiResponse={apiResponse} />
        </div>
      </div>
    </>
  );
}

export default SectionLayout1;
