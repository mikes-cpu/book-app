import React from "react";
import SearchBookCard from "../SearchBookCard/SearchBookCard";
import "./SearchBookCardList.scss";

function SearchBookCardList({ apiResponse, userID, setUserID }) {
  return !apiResponse ? (
    <>
      <h2 className="before-search-text">
        YOUR SEARCH RESULTS WILL BE SHOWN HERE..
      </h2>
    </>
  ) : (
    <>
      <div className="search-book-card-list">
        <div className="search-book-card-list__container">
          {apiResponse.map((book) => (
            <>
              <SearchBookCard
                book={book}
                userID={userID}
                setUserID={setUserID}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchBookCardList;
