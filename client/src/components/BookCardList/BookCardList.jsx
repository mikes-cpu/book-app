import React from "react";
import "./BookCardList.scss";
import BookCard from "../BookCard/BookCard";

function BookCardList({ apiResponse }) {
  return !apiResponse ? (
    <>
      <h1>Please enter something...</h1>
    </>
  ) : (
    <>
      <div className="bookCardList">
        <div className="bookCardList__container">
          {apiResponse.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BookCardList;
