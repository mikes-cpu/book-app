import { navigate, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import Alert from "../../components/Alert/Alert";
import SearchBookCardList from "../../components/SearchBookCardList/SearchBookCardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./Search.scss";

function Search({
  setSearch,
  apiResponse,
  userID,
  setUserID,
  searchApiLoading,
  message,
  setMessage,
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    updateMessage();
    setTimeout(deleteMessage, 5000);
  }, [message]);

  const updateMessage = () => {
    let theMessage = message ? <Alert message={message} /> : "";
    setContent(theMessage);
  };

  const deleteMessage = () => {
    setContent("");
  };

  return (
    <>
      <div className="search">
        <div className="search__container">
          {content ? content : ""}

          <div className="container__header">
            <h1 className="header__header">SEARCH</h1>
            <a
              onClick={() => navigate("/home")}
              className="header__home-link"
              href=""
            >
              HOME
            </a>
          </div>
          <div className="container__search-section">
            <SearchBox setSearch={setSearch} />
            <SearchBookCardList
              apiResponse={apiResponse}
              userID={userID}
              setUserID={setUserID}
              searchApiLoading={searchApiLoading}
              setMessage={setMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
