const express = require('express');
const router = express.Router();
const BookGenre = require('../models/bookGenres');

router.post('/:isbn/genres/:genreId', async (req, res, next) => { 
    try {
        console.log('POST request to /books/:isbn/genres/:genreId');
        const { isbn, genreId } = req.params;
        console.log(`Adding genre ${genreId} to book ${isbn}`);
        const bookGenre = await BookGenre.addGenreToBook(isbn, genreId);
        console.log(`Added genre to book:`, bookGenre);
        return res.status(201).json({ message: "Genre added to book", bookGenre });
    } catch (err) {
        console.error(`Error in POST /books/${req.params.isbn}/genres/${req.params.genreId}:`, err);
        return res.status(500).json({ error: err.message });
    }
});


router.get('/:isbn/genres', async (req, res, next) => {
    try {
        const { isbn } = req.params;
        console.log(`Fetching genres for book ${isbn}`);
        const genres = await BookGenre.getGenresOfBook(isbn);
        console.log(`Genres for book ${isbn}:`, genres);
        return res.json({ genres });
    } catch (err) {
        console.error(`Error in GET /books/${req.params.isbn}/genres:`, err);
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;
