const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    instructions: {type: String},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    ingredients: [mongoose.Schema.Types.ObjectId]
})