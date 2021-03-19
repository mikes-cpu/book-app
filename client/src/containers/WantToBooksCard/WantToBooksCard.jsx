import React, { useState } from "react";
import "./WantToBooksCard.scss";
import axios from "axios";
import { Link, navigate } from "@reach/router";

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

  const moveToReadHandler = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:6001/book/move/${selectedBook._id}`,
        {
          listType: "read",
        }
      );
      console.log(response);
      navigate("/want-to-books");
    } catch (err) {
      console.log(err.message);
    }
  };

  const moveToReadingHandler = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:6001/book/move/${selectedBook._id}`,
        {
          listType: "reading",
        }
      );
      console.log(response);
      navigate("/want-to-books");
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
      navigate("/want-to-books");
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  return editClicked == false ? (
    <>
      <div className="wantToBooksCard">
        <div className="wantToBooksCard__container">
          <nav>
            <Link to="/home">
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
            <button onClick={() => setEditClicked(true)}>Edit</button>
            <button onClick={delClickHandler}>Delete</button>
            <button onClick={moveToReadHandler}>Move to Read</button>
            <button onClick={moveToReadingHandler}>Move to Reading</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="wantToBooksCard">
        <div className="wantToBooksCard__container">
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
              <button onClick={patchClickHandler}>Enter</button>
              <button onClick={delClickHandler}>Delete</button>
              <button onClick={moveToReadHandler}>Move to Read</button>
              <button onClick={moveToReadingHandler}>Move to Reading</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default WantToBooksCard;
