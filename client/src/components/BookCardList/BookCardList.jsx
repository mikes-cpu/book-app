import { invalid } from "joi";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import "./BookCardList.scss";

function BookCardList({
  allBooks,
  setAllBooks,
  setSelectedBook,
  getReadingBooks,
}) {
  // useEffect(() => {
  //   console.log(allBooks);
  //   allBooks = "";
  //   if (allBooks === []) {
  //     console.log("YES");
  //   } else {
  //     console.log("NO");
  //   }
  // }, []);
  return (
    <>
      <div className="bookCardList">
        <div className="bookCardList__container">
          {allBooks ? (
            allBooks.map((book) => (
              <BookCard setSelectedBook={setSelectedBook} book={book} />
            ))
          ) : (
            <h2>Please add some read books</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default BookCardList;
