import React, { useState } from "react";
import "./ReadingBooksCard.scss";
import axios from "axios";
import { Link } from "@reach/router";

function ReadingBooksCard({ selectedBook }) {
  const [notes, setNotes] = useState(
    selectedBook.notes === ""
      ? "Press the edit button to start writing notes for this book"
      : selectedBook.notes
  );
  const [editClicked, setEditclicked] = useState(false);
  console.log(notes);

  const clickHandler = async (e) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:6001/book/${selectedBook._id}`,
        {
          notes: notes,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return editClicked == false ? (
    <>
      <div className="readingBooksCard">
        <div className="readingBooksCard__container">
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
            <Link to="/want-to-books">
              <h2>WANT TO</h2>
            </Link>
          </nav>
          <div className="container__thumbnail">
            <img src={selectedBook.thumbnail} alt="" />
          </div>
          <div className="container__info">
            <h2>Title:</h2>
            <p>{selectedBook.title}</p>
            <hr />
            <h2>Author:</h2>
            <p>{selectedBook.author}</p>
            <h2>Category:</h2>
            <p>{selectedBook.category}</p>
            {/* <h2>Publisher:</h2>
            <p>{selectedBook.publisher}</p> */}
            {/* <button>Add</button> */}
            <h2>Notes:</h2>
            <p>{notes}</p>
            <button onClick={() => setEditclicked(true)}>Edit</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="readingBooksCard">
        <div className="readingBooksCard__container">
          <div className="container__thumbnail">
            <img src={selectedBook.thumbnail} alt="" />
          </div>
          <div className="container__info">
            <h2>Title:</h2>
            <p>{selectedBook.title}</p>
            <hr />
            <h2>Author:</h2>
            <p>{selectedBook.author}</p>
            <h2>Category:</h2>
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
              <button onClick={clickHandler}>Enter</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadingBooksCard;
