const express = require("express");
const Book = require("../models/book");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const bookSchema = require("../schemas/bookSchema");

const router = new express.Router();


router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    console.error("Error in GET /books:", err);
    return next(err);
  }
});


router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});


router.post("/", async function (req, res, next) {
  console.log("Received POST request data:", req.body);
  try {
    const validate = ajv.compile(bookSchema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ errors: validate.errors });
    }
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    console.error("Error in POST /books:", err);
    return next(err);
  }
});



router.put("/:isbn", async function (req, res, next) {
  try {
    console.log("Received data for PUT:", req.body); 
      const validate = ajv.compile(bookSchema);
      const valid = validate(req.body);
      if (!valid) {
          return res.status(400).json({ errors: validate.errors });
      }

      const book = await Book.update(req.params.isbn, req.body);
      return res.json({ book });
  } catch (err) {
      return next(err);
  }
});


router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:isbn", async function(req, res, next) {
  try {
    const book = await Book.partialUpdate(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
