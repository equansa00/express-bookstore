// routes/genres.js
const express = require('express');
const router = new express.Router();
const Genre = require('../models/genre');

// POST route to add a genre
router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;
        const genre = await Genre.create(name);
        return res.status(201).json({ genre });
    } catch (err) {
        return next(err);
    }
});

// GET route to retrieve all genres
router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.findAll();
        return res.json({ genres });
    } catch (err) {
        return next(err);
    }
});

// GET route to retrieve a single genre by id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        return res.json({ genre });
    } catch (err) {
        return next(err);
    }
});

// PUT route to update a genre
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // Assuming name is the field to update
        const updatedGenre = await Genre.update(id, name);
        if (!updatedGenre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        return res.json({ genre: updatedGenre });
    } catch (err) {
        return next(err);
    }
});

// DELETE route to delete a genre
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Genre.remove(id);
        return res.json({ message: "Genre deleted successfully" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;
