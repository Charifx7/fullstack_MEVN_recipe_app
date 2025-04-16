const express = require("express");
const router = express.Router();
const {
  getRecipe,
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} = require("../controllers/recipeController");
const verifyToken = require("../middleware/authMiddleware");

router.route("/").get(getRecipes);

router.route("/").post(verifyToken,createRecipe);

router.route("/my").get(verifyToken,getUserRecipes);

router.route("/:id").get(getRecipe);

router.route("/:id").put(verifyToken,updateRecipe);

router.route("/:id").delete(verifyToken,deleteRecipe);






module.exports = router;
