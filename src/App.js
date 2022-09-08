import { useState } from "react";
import TextField from "@mui/material/TextField";

import "./App.css";
import { Button } from "@mui/material";

function App() {
  const [url, setUrl] = useState("");
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const [newUrl, setNewUrl] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let res = await fetch("https://shawwty.herokuapp.com/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalURL: url,
        }),
      });

      let json = await res.json();
      setNewUrl(json.url.newURL);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Link Shortener</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter your URL here"
          variant="outlined"
          fullWidth
          value={url}
          onChange={handleUrlChange}
        />
        <div className="center mt-1rem">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <h1>Shortened URL:</h1>
      <div className="center">
        <a href={newUrl} target="_blank">
          {newUrl}
        </a>
      </div>
    </div>
  );
}

export default App;
