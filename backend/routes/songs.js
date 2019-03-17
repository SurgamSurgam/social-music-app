const express = require("express");
const router = express.Router();

const {
  getAllSongs,
  getAllSongsForOneGenre,
  getAllSongsPostedByOneUser,
  getSingleSong,
  addSong,
  deleteSong
} = require("../db/queries/songsQueries.js");

/* GET users listing. */
router.get("/", getAllSongs);
router.get("/genres/:genre_id", getAllSongsForOneGenre);
router.get("/users/:user_id", getAllSongsPostedByOneUser);
router.get("/:song_id", getSingleSong);
router.post("/", addSong);
router.delete("/:song_id", deleteSong);

module.exports = router;
