const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  state: String,
  description: String,
  images: [String]
});

module.exports = mongoose.model("City", citySchema);

