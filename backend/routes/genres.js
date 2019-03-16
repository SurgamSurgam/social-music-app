const express = require("express");
const router = express.Router();

const { getAllGenres, addGenre } = require("../db/queries/genresQueries.js");

/* GET users listing. */
router.get("/", getAllGenres);
router.post("/", addGenre);

module.exports = router;
