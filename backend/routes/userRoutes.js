const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");
router.get("/favorites", authenticateToken, getFavorites);
router.post("/favorites", authenticateToken, addFavorite);
router.delete("/favorites", authenticateToken, removeFavorite);


module.exports = router;
