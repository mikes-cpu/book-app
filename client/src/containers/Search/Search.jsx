import { navigate } from "@reach/router";
import React from "react";
import SearchBookCardList from "../../components/SearchBookCardList/SearchBookCardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./Search.scss";

function Search({ setSearch, apiResponse, userID, setUserID }) {
  return (
    <>
      <div className="search">
        <div className="search__container">
          <div className="container__header">
            <h1 className="header__header">SEARCH</h1>
            <a
              onClick={() => navigate("/home")}
              className="header__home-link"
              href=""
            >
              HOME
            </a>
          </div>
          <div className="container__search-section">
            <SearchBox setSearch={setSearch} />
            <SearchBookCardList
              apiResponse={apiResponse}
              userID={userID}
              setUserID={setUserID}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
