const express = require("express");

const db = require("../config/db");

const router = express.Router();

//GET
//Redirect newURL to originalUrl
router.get("/:urlCode", async (req, res) => {
  const query = "SELECT * FROM urls WHERE urlCode = ?";
  db.query(query, [req.params.urlCode], (error, results) => {
    if (!results[0]) {
      res.json({ status: `urlCode not found` });
    } else {
      res.redirect(results[0].originalURL);
    }
  });
});

module.exports = router;
