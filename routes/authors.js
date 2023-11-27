const express = require('express');
const router = new express.Router();
const Author = require('../models/author');

router.post('/', async (req, res, next) => {
    console.log("Request body:", req.body);
    try {
        const { name } = req.body;
        const author = await Author.create(name);
        return res.status(201).json({ author });
    } catch (err) {
        console.error("Error in POST /authors:", err);
        return next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const authors = await Author.findAll();
        return res.json({ authors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.json({ author });
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const author = await Author.update(id, name);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        return res.json({ author });
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Author.remove(id);
        return res.json({ message: "Author deleted" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;
