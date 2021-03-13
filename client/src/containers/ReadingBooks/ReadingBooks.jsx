import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCardList from "../../components/BookCardList";
import "./ReadingBooks.scss";

function ReadingBooks({ setSelectedBook }) {
  const [allBooks, setAllBooks] = useState();

  const getReadingBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:6001/book");
      const filtered = response.data.filter((book) => {
        return book.listType === "reading";
      });
      console.log(filtered);
      setAllBooks(filtered);
      console.log(allBooks);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getReadingBooks();
    // console.log(allBooks);
  }, []);

  return (
    <>
      <div className="readingBooks">
        <div className="readingBooks__container">
          <div className="container__header">
            <h2 className="header__title">READING</h2>
            <p className="header__subtitle">
              “ALL OF THE BOOKS YOU ARE READING ARE LISTED HERE!’
            </p>
            <nav>
              <Link to="/">
                <h2>HOME</h2>
              </Link>
              <Link to="/read-books">
                <h2>READ</h2>
              </Link>
              <Link to="/want-to-books">
                <h2>WANT TO</h2>
              </Link>
            </nav>
          </div>
          <BookCardList allBooks={allBooks} setSelectedBook={setSelectedBook} />
        </div>
      </div>
    </>
  );
}

export default ReadingBooks;
