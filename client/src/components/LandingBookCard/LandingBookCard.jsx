import React, { useEffect, useState } from "react";
import "./LandingBookCard.scss";
import axios from "axios";

function LandingBookCard({ book }) {
  const [bookDb, setBookDb] = useState({});

  useEffect(() => {
    const handelClick = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:6001/book/add",
          bookDb
        );
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    handelClick();
  }, [bookDb]);

  return (
    <>
      <div className="landingBookCard">
        <div className="landingBookCard__container">
          {/* <div className="container__thumbnail">
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
          </div> */}
          <div className="container__info">
            <p className="info__title">{book.volumeInfo.title}</p>
            <p className="info__author">{book.volumeInfo.authors}</p>
          </div>
          <div className="container__buttons">
            <button
              onClick={() => {
                setBookDb({
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors,
                  thumbnail: book.volumeInfo.imageLinks.thumbnail,
                  category: book.volumeInfo.categories,
                  listType: "read",
                  notes: "",
                });
              }}
              className="button__read"
            >
              READ
            </button>
            <button
              onClick={() => {
                setBookDb({
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors,
                  thumbnail: book.volumeInfo.imageLinks.thumbnail,
                  category: book.volumeInfo.categories,
                  listType: "reading",
                  notes: "",
                });
              }}
              className="button__reading"
            >
              READING
            </button>
            <button
              onClick={() => {
                setBookDb({
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors,
                  thumbnail: book.volumeInfo.imageLinks.thumbnail,
                  category: book.volumeInfo.categories,
                  listType: "want_to",
                  notes: "",
                });
              }}
              className="button__wantTo"
            >
              WANT TO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingBookCard;
