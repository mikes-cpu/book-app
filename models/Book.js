const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  category: {
    type: Array,
    required: false,
  },
  listType: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Book", BookSchema);
