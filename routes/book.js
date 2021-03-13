const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json(`Error: ${err.message}`);
  }
});

router.post("/add", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    thumbnail: req.body.thumbnail,
    category: req.body.category,
    listType: req.body.listType,
    notes: req.body.notes,
  });

  try {
    const savedBook = await book.save();
    res.json(savedBook);
    console.log(savedBook);
  } catch (err) {
    res.json(`Error: ${err.message}`);
    console.log(`routes:book.js: ${err.message}`);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      { $set: { notes: req.body.notes } }
    );
    res.json(updatedBook);
  } catch (err) {
    res.json(`Error: ${err.message}`);
  }
});

module.exports = router;
