const express = require("express");
const router = express.Router();

const {
  getAllFavorites,
  getAllFavoritesForOneSong,
  getAllFavoritesForOneUser,
  addFavorite,
  deleteFavorite
} = require("../db/queries/favoritesQueries.js");

/* GET users listing. */
router.get("/", getAllFavorites);
router.get("/songs/:song_id", getAllFavoritesForOneSong);
router.get("/users/:user_id", getAllFavoritesForOneUser);
// router.get("/:song_id", getSingleSong);
router.post("/", addFavorite);
router.delete("/:favorites_id", deleteFavorite);

module.exports = router;
