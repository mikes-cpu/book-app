import { Link } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCardList from "../../components/BookCardList";
import "./ReadBooks.scss";

function ReadBooks({ setSelectedBook, setUserID, userID }) {
  const [allBooks, setAllBooks] = useState();
  const [loading, setLoading] = useState(false);

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

  const getReadBooks = async () => {
    try {
      const response = await axios.get("/api/book");
      console.log(response);
      const filtered = response.data.filter((book) => {
        console.log(book);
        return book.listType === "read";
      });
      const usersBooks = filtered.filter((book) => {
        return book.userID === userID;
      });
      console.log(filtered);
      setAllBooks(usersBooks);
      console.log(filtered);
      setLoading(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getReadBooks();
    console.log(allBooks);
    // console.log(allBooks);
  }, [loading]);

  return (
    <>
      <div className="readBooks">
        <div className="readBooks__container">
          <div className="container__header">
            <h1 className="header__header">READ</h1>
            <h2 className="header__quote">
              "BOOKS ARE A UNIQUELY PORTABLE MAGIC." - STEPHEN KING
            </h2>
            <Link className="header__home-link" to="/home">
              <p className="home-link__text">HOME</p>
            </Link>
          </div>
          <div className="container__book-list">
            {loading ? (
              <BookCardList
                allBooks={allBooks}
                setSelectedBook={setSelectedBook}
              />
            ) : (
              <h1>LOADING</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadBooks;
