import "./App.scss";
import { useEffect, useState } from "react";
import { Router } from "@reach/router";
import ReadBooks from "./containers/ReadBooks/ReadBooks";
import ReadBooksCard from "./containers/ReadBooksCard/ReadBooksCard";
import ReadingBooks from "./containers/ReadingBooks";
import ReadingBooksCard from "./containers/ReadingBooksCard";
import WantToBooks from "./containers/WantToBooks";
import WantToBooksCard from "./containers/WantToBooksCard";
import Landing from "./containers/Landing";
import Home from "./containers/Home/Home";
import Signup from "./containers/Signup/Signup";
import Search from "./containers/Search/Search";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [apiResponse, setApiResponse] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userID, setUserID] = useState("shit");

  useEffect(() => {
    if (search) {
      const requestBookInfo = async () => {
        try {
          const url = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${search}`
          );
          let response = await url.json();
          setApiResponse(response.items);
          console.log(apiResponse);
        } catch (error) {
          console.log("There was an error");
        }
      };
      requestBookInfo();
    }
  }, [search]);

  const getJwtAuth = async () => {
    try {
      const jwt = await axios.get("/api/user/authorise");
      console.log(jwt.data.jwt.cookie);
      let fullString = jwt.data.jwt.cookie;
      let finalString = fullString.slice(10, 100000);
      setJwt(finalString);
      console.log(finalString);
    } catch (error) {
      console.log("No authorisation code");
    }
  };

  return (
    <Router>
      <Landing
        path="/"
        setSearch={setSearch}
        apiResponse={apiResponse}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        getJwtAuth={getJwtAuth}
        jwt={jwt}
        setUserID={setUserID}
      />
      <Home
        path="home"
        jwt={jwt}
        setJwt={setJwt}
        setSearch={setSearch}
        apiResponse={apiResponse}
        setUserID={setUserID}
        userID={userID}
      />
      <Signup
        setJwt={setJwt}
        jwt={jwt}
        path="signup"
        getJwtAuth={getJwtAuth}
        setUserID={setUserID}
      />
      <Search
        path="search"
        apiResponse={apiResponse}
        setSearch={setSearch}
        setUserID={setUserID}
        userID={userID}
      />
      <ReadBooks
        path="read-books"
        setSelectedBook={setSelectedBook}
        setUserID={setUserID}
        userID={userID}
      />
      <ReadBooksCard path="read-books/book" selectedBook={selectedBook} />
      <ReadingBooks
        path="reading-books"
        setSelectedBook={setSelectedBook}
        setUserID={setUserID}
        userID={userID}
      />
      <ReadingBooksCard path="reading-books/book" selectedBook={selectedBook} />
      <WantToBooks
        path="want-to-books"
        setSelectedBook={setSelectedBook}
        setUserID={setUserID}
        userID={userID}
      />
      <WantToBooksCard path="want-to-books/book" selectedBook={selectedBook} />
    </Router>
  );
}

export default App;
