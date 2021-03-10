import "./App.scss";
import { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Home from "./containers/Home";

function App() {
  const [search, setSearch] = useState("");
  const [apiResponse, setApiResponse] = useState(false);

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
    </Router>
  );
}

export default App;
