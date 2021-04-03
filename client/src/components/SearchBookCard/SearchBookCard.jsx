import React, { useEffect, useState } from "react";
import "./SearchBookCard.scss";
import axios from "axios";
import chevron from "../../img/chevron_down.png";
import noimagefound from "../../img/no-image.png";

function SearchBookCard({ book, userID, setUserID, setMessage }) {
  const [bookDb, setBookDb] = useState({});
  const [classExpanded, setClassExpanded] = useState(false);

  // set user id
  const getCurrentUser = async () => {
    try {
      const currentUser = await axios.get("/api/user/authorise");
      console.log(currentUser);
      setUserID(currentUser.data.user.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const handelClick = async () => {
      try {
        const response = await axios.post("/api/book/add", bookDb);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    handelClick();
    console.log(bookDb);
  }, [bookDb]);

  const toggleClass = () => {
    classExpanded ? setClassExpanded(false) : setClassExpanded(true);
  };

  return (
    <>
      <div className="search-Book-card">
        <div
          className={
            classExpanded
              ? "search-Book-card__container container__expanded"
              : "search-Book-card__container"
          }
          onClick={toggleClass}
        >
          <div className="container__thumbnail">
            <img
              className="thumbnail__img"
              src={
                book.volumeInfo.imageLinks === undefined
                  ? noimagefound
                  : `${book.volumeInfo.imageLinks.thumbnail}`
              }
            />
          </div>
          <div className="container__info">
            <p className="info__title">{book.volumeInfo.title}</p>
            <p className="info__author">{book.volumeInfo.authors}</p>
          </div>
          <div className="container__buttons">
            <button
              onClick={() => {
                book.volumeInfo.imageLinks === undefined
                  ? setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      category: book.volumeInfo.categories,
                      listType: "read",
                      notes: "",
                    })
                  : setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      thumbnail: book.volumeInfo.imageLinks.thumbnail,
                      category: book.volumeInfo.categories,
                      listType: "read",
                      notes: "",
                    });
                setMessage(`${book.volumeInfo.title} added to read list`);
              }}
              className="button__read"
            >
              READ
            </button>
            <button
              onClick={() => {
                book.volumeInfo.imageLinks === undefined
                  ? setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      category: book.volumeInfo.categories,
                      listType: "reading",
                      notes: "",
                    })
                  : setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      thumbnail: book.volumeInfo.imageLinks.thumbnail,
                      category: book.volumeInfo.categories,
                      listType: "reading",
                      notes: "",
                    });
                setMessage(`${book.volumeInfo.title} added to reading list`);
              }}
              className="button__reading"
            >
              READING
            </button>
            <button
              onClick={() => {
                book.volumeInfo.imageLinks === undefined
                  ? setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      category: book.volumeInfo.categories,
                      listType: "want_to",
                      notes: "",
                    })
                  : setBookDb({
                      userID: userID,
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors,
                      thumbnail: book.volumeInfo.imageLinks.thumbnail,
                      category: book.volumeInfo.categories,
                      listType: "want_to",
                      notes: "",
                    });
                setMessage(
                  `${book.volumeInfo.title} added to want to read list`
                );
              }}
              className="button__wantTo"
            >
              WANT TO
            </button>
          </div>
          <img className="container__chevron" src={chevron} alt="" />
        </div>
      </div>
    </>
  );
}

export default SearchBookCard;
