const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { mongo, default: mongoose } = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.pantry.push(req.body);
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.delete("/:itemId", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        await user.pantry.id(req.params.itemId).deleteOne();
        await user.save();
        res.redirect("/users/:userId/foods")
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.get("/:itemId/edit", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.render("foods/edit.ejs", { food: user.pantry.id(req.params.itemId) });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.put("/:itemId", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.pantry.id(req.params.itemId).set(req.body);
        await user.save();
        res.redirect("/users/:userId/foods");
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

module.exports = router;
