const Recipe = require("../models/recipeModel");
const asyncHandler = require("express-async-handler");

// @desc GET all recipe
// @route GET /api/recipe
// @access public

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);

});

// @desc Create new recipe
// @route POST /api/recipe
// @access private

const createRecipe = asyncHandler(async (req, res) => {
  const { name, ingredient, image, instructions } = req.body;
  if (!name || !ingredient || !image || !instructions) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const recipe = await Recipe.create({
    name,
    ingredient,
    image,
    instructions,
    createdBy: req.user.id,
  });

  const token = req.headers.authorization.split(" ")[1];
  res.status(201).json({recipe,token});
});

// @desc Get single recipe
// @route GET/api/recipe/:id
// @access public

const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json(recipe);
});

// @desc update recipe
// @route PUT /api/recipe
// @access private

const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  if (recipe.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("User don't have permission to update other user recipe");
  }

  const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateRecipe);
});

// @desc Delete recipe
// @route DELETE /api/recipe
// @access private

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  
  await Recipe.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: `Delete recipes for ${req.params.id}` });
});

// @desc Get user's recipes
// @route GET /api/recipe/my
// @access Private

const getUserRecipes = asyncHandler(async (req, res) => {

  const userId = req.user.id;
  
  const recipes = await Recipe.find({ createdBy: userId });
  

  console.log("User ID:", userId);
  console.log("Found recipes:", recipes);

  if (!recipes) {
      res.status(404);
      throw new Error("No recipes found");
  }

  res.status(200).json(recipes);
});


module.exports = {
  getRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
};
