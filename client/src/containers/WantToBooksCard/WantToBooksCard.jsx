import React, { useState } from "react";
import "./WantToBooksCard.scss";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import backIMG from "../../img/back-img.svg";

function WantToBooksCard({ selectedBook }) {
  const [notes, setNotes] = useState(
    selectedBook.notes === ""
      ? "Press the edit button to start writing notes for this book"
      : selectedBook.notes
  );
  const [editClicked, setEditClicked] = useState(false);
  console.log(notes);

  const patchClickHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/book/${selectedBook._id}`, {
        notes: notes,
      });
      console.log(response);
      setEditClicked(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const moveToReadHandler = async () => {
    try {
      const response = await axios.patch(`/api/book/move/${selectedBook._id}`, {
        listType: "read",
      });
      console.log(response);
      navigate("/read-books");
    } catch (err) {
      console.log(err.message);
    }
  };

  const moveToReadingHandler = async () => {
    try {
      const response = await axios.patch(`/api/book/move/${selectedBook._id}`, {
        listType: "reading",
      });
      console.log(response);
      navigate("/reading-books");
    } catch (err) {
      console.log(err.message);
    }
  };

  const delClickHandler = async () => {
    try {
      const response = await axios.delete(`/api/book/${selectedBook._id}`);
      console.log(response);
      navigate("/want-to-books");
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  return editClicked == false ? (
    <>
      <div className="want-to-books-card">
        <div className="want-to-books-card__container">
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
              className="buttons__move-to-read"
              onClick={moveToReadHandler}
            >
              MOVE TO READ
            </button>
            <button
              className="buttons__move-to-reading"
              onClick={moveToReadingHandler}
            >
              MOVE TO READING
            </button>
            <button
              className="buttons__delete-button"
              onClick={delClickHandler}
            >
              DELETE BOOK
            </button>
          </div>
          <Link to="/want-to-books">
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
      <div className="want-to-books-card">
        <div className="want-to-books-card__container">
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
          <Link to="/want-to-books">
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

export default WantToBooksCard;
