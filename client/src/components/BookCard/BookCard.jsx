import React, { useEffect, useState } from "react";
import "./BookCard.scss";
import { Link } from "@reach/router";

function BookCard({ book, setSelectedBook }) {
  const [link, setLink] = useState("");
  const linkHandler = () => {
    if (book.listType === "read") {
      setLink("read");
    } else if (book.listType === "reading") {
      setLink("reading");
    } else {
      setLink("want-to");
    }
  };

  useEffect(() => {
    linkHandler();
  }, []);

  return (
    <>
      <div onClick={() => setSelectedBook(book)} className="bookCard">
        <Link to={`/${link}-books/book`}>
          <div className="bookCard__container">
            <div className="container__thumbnail">
              <img src={book.thumbnail} alt="" />
            </div>
            <div className="container__info">
              <p className="info__title">{book.title}</p>
              <p className="info__author">{book.author}</p>
              <button className="info__make-notes-button">MAKE NOTES</button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default BookCard;
