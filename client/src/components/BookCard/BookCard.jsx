import React from "react";
import "./BookCard.scss";

function BookCard({ book }) {
  return (
    <>
      <div className="bookCard">
        <div className="bookCard__container">
          <div className="container__thumbnail">
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
          </div>
          <div className="container__info">
            <h2>Title:</h2>
            <p>{book.volumeInfo.title}</p>
            <h2>Author:</h2>
            <p>{book.volumeInfo.authors}</p>
            <h2>Categories:</h2>
            <p>{book.volumeInfo.categories}</p>
            <h2>Publisher:</h2>
            <p>{book.volumeInfo.publisher}</p>
            <button>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
