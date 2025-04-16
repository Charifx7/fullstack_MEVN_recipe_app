const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Only admin access this router
router.route("/admin").get(verifyToken, authorizeRole("admin"), (req, res) => {
  res.send("Admin route");
});


// All can access this router
router
  .route("/user")
  .get(verifyToken, authorizeRole("admin", "user"), (req, res) => {
    res.send("User route");
  });

module.exports = router;
