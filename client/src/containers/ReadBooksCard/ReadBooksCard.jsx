import React, { useState } from "react";
import "./ReadBooksCard.scss";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Navbar from "../../components/Navbar/Navbar";

function ReadBooksCard({ selectedBook }) {
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
      const response = await axios.patch(
        `http://127.0.0.1:6001/book/${selectedBook._id}`,
        {
          notes: notes,
        }
      );
      console.log(response);
      setEditClicked(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const delClickHandler = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:6001/book/${selectedBook._id}`
      );
      console.log(response);
      navigate("/read-books");
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  return editClicked == false ? (
    <>
      <div className="readBooksCard">
        <div className="readBooksCard__container">
          <Navbar />
          <div className="container__thumbnail">
            <img src={selectedBook.thumbnail} alt="" />
          </div>
          <div className="container__info">
            <h4>Title:</h4>
            <p>{selectedBook.title}</p>
            <h4>Author:</h4>
            <p>{selectedBook.author}</p>
            <h4>Category:</h4>
            <p>{selectedBook.category}</p>
            {/* <h2>Publisher:</h2>
            <p>{selectedBook.publisher}</p> */}
            {/* <button>Add</button> */}
            <h4>Notes:</h4>
            <p className="info__notes">{notes}</p>
            <button onClick={() => setEditClicked(true)}>Edit</button>
            <button onClick={delClickHandler}>Delete</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="readBooksCard">
        <div className="readBooksCard__container">
          <div className="container__thumbnail">
            <img src={selectedBook.thumbnail} alt="" />
          </div>
          <div className="container__info">
            <h3>Title:</h3>
            <p>{selectedBook.title}</p>
            {/* <hr /> */}
            <h3>Author:</h3>
            <p>{selectedBook.author}</p>
            <h3>Category:</h3>
            <p>{selectedBook.category}</p>
            {/* <h2>Publisher:</h2>
        <p>{selectedBook.publisher}</p> */}
            {/* <button>Add</button> */}
            <h2>Notes:</h2>
            <form action="">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                defaultValue={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <button onClick={patchClickHandler}>Enter</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadBooksCard;
