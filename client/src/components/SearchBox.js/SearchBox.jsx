import React, { useState } from "react";
import "./SearchBox.scss";

function SearchBox({ setSearch }) {
  const [input, setInput] = useState("");

  const clickHandler = () => {
    setSearch(input);
  };

  return (
    <>
      <div className="search-Box">
        <div className="search-box__container">
          <form action="">
            <input
              type="text"
              onInput={(event) => setInput(event.target.value)}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                clickHandler();
              }}
            >
              CHECK
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
