const express = require('express');
const router = new express.Router();
const UserAuthor = require('../models/userAuthor');


// POST /users/:userId/authors/:authorId
router.post('/users/:userId/authors/:authorId', async (req, res, next) => {
    try {
        const { userId, authorId } = req.params;
        // Assuming a UserAuthor model exists to manage the relationship
        const followedAuthor = await UserAuthor.followAuthor(userId, authorId);
        return res.status(201).json({ message: "Author followed successfully", followedAuthor });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// GET /users/:userId/authors
router.get('/users/:userId/authors', async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Fetch the followed authors from the database
        const authors = await UserAuthor.getFollowedAuthors(userId);
        return res.json({ authors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;