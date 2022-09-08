const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const db = require("../config/db");

//POST
//create short url
router.post("/shorten", async (req, res) => {
  const originalURL = req.body.originalURL;
  const baseUrl = "https://shawwty.herokuapp.com";

  //Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //Create url code
  const urlCode = shortid.generate();

  //Check originalURL
  if (validUrl.isUri(originalURL)) {
    try {
      const query = "SELECT * FROM urls WHERE originalURL = ?";
      db.query(query, [originalURL], (error, results) => {
        if (error) {
          res.json({ status: "error", reason: error.code });
        }
        if (!results[0]) {
          const newURL = baseUrl + "/" + urlCode;
          const data = {
            urlCode: urlCode,
            originalURL: originalURL,
            newURL: newURL,
          };
          db.query(
            "INSERT INTO urls VALUES (?, ?, ?)",
            Object.values(data),
            (error, results) => {
              if (error) {
                console.error(error);
              } else {
                res.json({ url: data });
              }
            }
          );
        } else {
          res.json({ url: results[0] });
        }
      });
    } catch (err) {
      res.json({ status: "error", reason: err });
    }
  } else {
    res.status(401).json(`invalid original url`);
  }
});

module.exports = router;
