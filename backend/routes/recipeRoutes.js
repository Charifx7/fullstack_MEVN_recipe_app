const express = require("express");
const router = express.Router();
const {
  getRecipe,
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

router.route("/").get(getRecipes);

router.route("/").post(createRecipe);

router.route("/:id").get(getRecipe);

router.route("/:id").put(updateRecipe);

router.route("/:id").delete(deleteRecipe);

module.exports = router;
