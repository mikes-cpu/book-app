import React from "react";
import SearchBookCard from "../SearchBookCard/SearchBookCard";
import "./SearchBookCardList.scss";

function SearchBookCardList({
  apiResponse,
  userID,
  setUserID,
  searchApiLoading,
  setMessage,
}) {
  console.log(apiResponse);

  return apiResponse ? (
    <>
      <div className="search-book-card-list">
        <div className="search-book-card-list__container">
          {apiResponse.map((book) => (
            <>
              {console.log(book)}
              <SearchBookCard
                book={book}
                userID={userID}
                setUserID={setUserID}
                setMessage={setMessage}
              />
            </>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
      <h2 className="before-search-text">
        YOUR SEARCH RESULTS WILL BE SHOWN HERE..
      </h2>
    </>
  );
}

export default SearchBookCardList;
