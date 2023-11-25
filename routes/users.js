// routes/users.js
const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// POST route to create a user
router.post('/', async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.create(username);
        return res.status(201).json({ user });
    } catch (err) {
        return next(err);
    }
});

// GET route to retrieve all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

// GET route to retrieve a single user by id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

// PUT route to update a user's information
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username } = req.body; // Assuming username is the field to update
        const updatedUser = await User.update(id, username);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user: updatedUser });
    } catch (err) {
        return next(err);
    }
});

// DELETE route to delete a user
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.remove(id);
        return res.json({ message: "User deleted successfully" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
