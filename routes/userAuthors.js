const express = require('express');
const router = express.Router({ mergeParams: true }); 
const UserAuthor = require('../models/userAuthor');

router.post('/:authorId', async (req, res, next) => {
    try {
        const { userId, authorId } = req.params;
        const followedAuthor = await UserAuthor.followAuthor(userId, authorId);
        return res.status(201).json({ message: "Author followed successfully", followedAuthor });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const authors = await UserAuthor.getFollowedAuthors(userId);
        return res.json({ authors });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
