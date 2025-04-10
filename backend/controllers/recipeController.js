const Recipe = require("../models/Recipe");
const asyncHandler = require("express-async-handler");

// @desc GET all recipe
// @route GET /api/recipe
// @access public

const getRecipes = asyncHandler (async(req, res) => {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  
    // res.status(200).json({message: "Get all recipes"});
});


// @desc Create new recipe
// @route POST /api/recipe
// @access public

const createRecipe = asyncHandler (async (req, res) => {
        const {name, ingredient, image, instructions} = req.body;
        if(!name || !ingredient || !image || !instructions) {
            res.status(400);
            throw new Error("All fields are required!");
        }
        const recipe = await Recipe.create({
            name, ingredient, image, instructions
        });
        res.status(201).json(recipe);
});

// @desc Get single recipe
// @route GET/api/recipe/:id
// @access public

const getRecipe =asyncHandler (async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not found")
    }
    res.status(200).json(recipe);
});

// @desc update recipe
// @route PUT /api/recipe
// @access public

const updateRecipe = asyncHandler (async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not found")
    }

    const updateRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateRecipe);
});

// @desc Delete recipe
// @route DELETE /api/recipe
// @access public

const deleteRecipe = asyncHandler (async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe){
        res.status(404);
        throw new Error("Recipe not found")
    }
    await Recipe.deleteOne({_id: req.params.id})
    res.status(200).json({message: `Delete recipes for ${req.params.id}`});
});




module.exports = { getRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe }