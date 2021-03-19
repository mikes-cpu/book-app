import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCardList from "../../components/BookCardList";
import "./ReadBooks.scss";
import Navbar from "../../components/Navbar/Navbar";

function ReadBooks({ setSelectedBook }) {
  const [allBooks, setAllBooks] = useState();
  const getReadBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:6001/book");
      const filtered = response.data.filter((book) => {
        return book.listType === "read";
      });
      console.log(filtered);
      setAllBooks(filtered);
      console.log(allBooks);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getReadBooks();
    // console.log(allBooks);
  }, []);

  return (
    <>
      <div className="readBooks">
        <div className="readBooks__container">
          <div className="container__header">
            <h2 className="header__title">READ</h2>
            <h3 className="header__subtitle">
              “ALL OF THE BOOKS YOU HAVE READ ARE LISTED HERE!’
            </h3>
            <Navbar />
          </div>
          <BookCardList allBooks={allBooks} setSelectedBook={setSelectedBook} />
        </div>
      </div>
    </>
  );
}

export default ReadBooks;
