import { invalid } from "joi";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import "./BookCardList.scss";

function BookCardList({ allBooks, setAllBooks, setSelectedBook }) {
  // useEffect(() => {
  //   console.log(allBooks);
  //   if (allBooks.length == 3) {
  //     console.log("yep");
  //   } else {
  //     console.log("Nope");
  //   }

  //   // setAllBooks();
  // }, [allBooks]);
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
