const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
    try {
        console.log("Request Body:", req.body); 
        const { username, password } = req.body;
        const user = await User.create(username, password);
        return res.status(201).json({ user });
    } catch (err) {
        console.error("Error in POST /users:", err);
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

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

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        const updatedUser = await User.update(id, username);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user: updatedUser });
    } catch (err) {
        return next(err);
    }
});

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
