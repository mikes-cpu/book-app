import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCardList from "../../components/BookCardList";
import "./WantToBooks.scss";

function WantToBooks({ setSelectedBook }) {
  const [allBooks, setAllBooks] = useState();

  const getWantToBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:6001/book");
      const filtered = response.data.filter((book) => {
        return book.listType === "want_to";
      });
      console.log(filtered);
      setAllBooks(filtered);
      console.log(allBooks);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getWantToBooks();
    // console.log(allBooks);
  }, []);

  return (
    <>
      <div className="wantToBooks">
        <div className="wantToBooks__container">
          <div className="container__header">
            <h2 className="header__title">WANT TO</h2>
            <p className="header__subtitle">
              “ALL OF THE BOOKS YOU WANT TO READ ARE LISTED HERE!’
            </p>
            <nav>
              <Link to="/">
                <h2>HOME</h2>
              </Link>
              <Link to="/read-books">
                <h2>READ</h2>
              </Link>
              <Link to="/reading-books">
                <h2>READING</h2>
              </Link>
            </nav>
          </div>
          <BookCardList allBooks={allBooks} setSelectedBook={setSelectedBook} />
        </div>
      </div>
    </>
  );
}

export default WantToBooks;
