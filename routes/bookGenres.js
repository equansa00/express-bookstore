const express = require('express');
const router = express.Router();
const BookGenre = require('../models/bookGenres');

// POST /books/:isbn/genres/:genreId
router.post('/books/:isbn/genres/:genreId', async (req, res, next) => {
    try {
        const { isbn, genreId } = req.params;
        const bookGenre = await BookGenre.addGenreToBook(isbn, genreId);
        return res.status(201).json({ message: "Genre added to book", bookGenre });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// GET /books/:isbn/genres
router.get('/books/:isbn/genres', async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const genres = await BookGenre.getGenresOfBook(isbn);
        return res.json({ genres });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
