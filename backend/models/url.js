const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  urlCode: String,
  originalURL: String,
  newURL: String,
});

module.exports = mongoose.model("Url", URLSchema);
