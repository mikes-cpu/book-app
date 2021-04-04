import React, { useEffect, useState } from "react";
import "./ReadBooksCard.scss";
import axios from "axios";
import { Link, navigate, useLocation } from "@reach/router";
import backIMG from "../../img/back-img.svg";
import Alert from "../../components/Alert/Alert";

function ReadBooksCard({ selectedBook, message, setMessage }) {
  const [notes, setNotes] = useState(
    selectedBook.notes === ""
      ? "Press the edit button to start writing notes for this book"
      : selectedBook.notes
  );
  const [editClicked, setEditClicked] = useState(false);
  const [content, setContent] = useState("");

  const patchClickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/book/${selectedBook._id}`, {
        notes: notes,
      });
      console.log(response);
      setEditClicked(false);
      setMessage(`${selectedBook.title}s notes were updated!`);
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const delClickHandler = async () => {
    try {
      const response = await axios.delete(`/api/book/${selectedBook._id}`);
      console.log(response);
      setMessage(
        `Book has been sucessfully deleted, redirecting to read books!`
      );
      setTimeout(() => navigate("/read-books"), 3500);
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  useEffect(() => {
    updateMessage();
  }, [message]);

  const updateMessage = () => {
    let theMessage = message ? <Alert message={message} /> : "";
    setContent(theMessage);
  };

  return editClicked == false ? (
    <>
      <div className="readBooksCard">
        <div className="readBooksCard__container">
          {content ? content : ""}
          <div className="container__header">
            <div className="header__book-details">
              <h2 className="book-details__title">{selectedBook.title}</h2>
              <h2 className="book-details__author">{selectedBook.author}</h2>
            </div>
          </div>
          <div className="container__note-section">
            <p className="note-section__text">{notes}</p>
          </div>
          <div className="container__buttons">
            <button
              className="buttons__edit-button"
              onClick={() => setEditClicked(true)}
            >
              EDIT NOTES
            </button>
            <button
              className="buttons__delete-button"
              onClick={delClickHandler}
            >
              DELETE BOOK
            </button>
          </div>
          <Link to="/read-books">
            <div className="container__back-link">
              <img className="back-link__img" src={backIMG} alt="" />
              <p className="back-link__text">BACK</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="readBooksCard">
        <div className="readBooksCard__container">
          <div className="container__header">
            <div className="header__book-details">
              <h2 className="book-details__title">{selectedBook.title}</h2>
              <h2 className="book-details__author">{selectedBook.author}</h2>
            </div>
          </div>
          <div className="container__note-section">
            <form action="">
              <textarea
                className="note-section__textarea"
                name=""
                id=""
                cols="30"
                rows="10"
                defaultValue={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </form>
          </div>
          <div className="container__buttons">
            <button
              className="buttons__enter-info-button"
              onClick={patchClickHandler}
            >
              ENTER
            </button>
          </div>
          <Link to="/read-books">
            <div className="container__back-link">
              <img className="back-link__img" src={backIMG} alt="" />
              <p className="back-link__text">BACK</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ReadBooksCard;
