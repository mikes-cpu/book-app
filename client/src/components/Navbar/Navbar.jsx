import { Link } from "@reach/router";
import React from "react";
import "./Navbar.scss";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <nav className="navbar__container__horizontal">
          <Link to="/home">
            <button className="buttons__home">HOME</button>
          </Link>
          <Link to="/read-books">
            <button className="buttons__read">READ</button>
          </Link>
          <Link to="/reading-books">
            <button className="buttons__reading">READING</button>
          </Link>
          <Link to="/want-to-books">
            <button className="buttons__want-to">WANT TO</button>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
