import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCardList from "../../components/BookCardList";
import "./ReadingBooks.scss";
import Navbar from "../../components/Navbar/Navbar";

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
            <h3 className="header__subtitle">
              “ALL OF THE BOOKS YOU ARE READING ARE LISTED HERE!’
            </h3>
            <Navbar />
          </div>
          <BookCardList allBooks={allBooks} setSelectedBook={setSelectedBook} />
        </div>
      </div>
    </>
  );
}

export default ReadingBooks;
