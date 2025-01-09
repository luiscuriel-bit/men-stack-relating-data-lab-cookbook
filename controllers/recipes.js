const express = require("express");
const router = express.Router();

const Ingredient = require("../models/ingredient.js");
const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.render("recipes/index.ejs", { recipes });;

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        const recipe = await Recipe.create(req.body);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

router.get("/:recipeId", async (req, res) => {
    try {
        const recipe = Recipe.findById(req.params.recipeId);
        res.render("recipes/show.ejs", { recipe });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;
