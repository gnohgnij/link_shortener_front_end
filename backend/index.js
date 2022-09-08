const express = require("express");
const connecDB = require("./config/db");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());

//allows accepting of json data
app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
