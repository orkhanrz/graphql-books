const mongoose = require("mongoose");

const Author = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  books: [],
});

module.exports = mongoose.model("Author", Author);
