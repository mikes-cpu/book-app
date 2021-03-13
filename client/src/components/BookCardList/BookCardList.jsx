import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BookCardList.scss";

function BookCardList({ allBooks, setSelectedBook }) {
  console.log(allBooks);
  return !allBooks ? (
    <>
      <h2>Please add some read books</h2>
    </>
  ) : (
    <>
      <div className="bookCardList">
        <div className="bookCardList__container">
          {allBooks.map((book) => (
            <BookCard setSelectedBook={setSelectedBook} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BookCardList;
