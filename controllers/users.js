const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { mongo, default: mongoose } = require('mongoose');

router.get("/", async (req, res) => {
    const users = await User.find();
    res.render("users/index.ejs", {users});
});

router.get("/:userId/show", async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render("users/show.ejs", {user});
});

module.exports = router;