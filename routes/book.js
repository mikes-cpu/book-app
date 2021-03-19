const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const varify = require("./privateRoutes");

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

// add notes to a book
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

// move book to a different listType
router.patch("/move/:id", async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      { $set: { listType: req.body.listType } }
    );
    res.json(updatedBook);
  } catch (err) {
    res.json(`Error: ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Book.remove({ _id: req.params.id });
    res.json("Successfully deleted");
  } catch (error) {
    res.json(`Error: ${err.message}`);
  }
});

module.exports = router;
