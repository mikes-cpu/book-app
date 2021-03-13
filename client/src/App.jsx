import "./App.scss";
import { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Home from "./containers/Home";
import ReadBooks from "./containers/ReadBooks/ReadBooks";
import ReadBooksCard from "./containers/ReadBooksCard/ReadBooksCard";
import ReadingBooks from "./containers/ReadingBooks";
import ReadingBooksCard from "./containers/ReadingBooksCard";
import WantToBooks from "./containers/WantToBooks";
import WantToBooksCard from "./containers/WantToBooksCard";

function App() {
  const [search, setSearch] = useState("");
  const [apiResponse, setApiResponse] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

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

  return (
    <Router>
      <Home path="/" setSearch={setSearch} apiResponse={apiResponse} />
      <ReadBooks path="read-books" setSelectedBook={setSelectedBook} />
      <ReadBooksCard path="read-books/book" selectedBook={selectedBook} />
      <ReadingBooks path="reading-books" setSelectedBook={setSelectedBook} />
      <ReadingBooksCard path="reading-books/book" selectedBook={selectedBook} />
      <WantToBooks path="want-to-books" setSelectedBook={setSelectedBook} />
      <WantToBooksCard path="want-to-books/book" selectedBook={selectedBook} />
    </Router>
  );
}

export default App;
