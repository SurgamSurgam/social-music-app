const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getAllCommentsForOneSong,
  addComment,
  editComment,
  deleteComment
} = require("../db/queries/commentsQueries.js");

/* GET users listing. */
router.get("/", getAllComments);
router.get("/songs/:song_id", getAllCommentsForOneSong);
router.post("/", addComment);
router.patch("/:comment_id", editComment);
router.delete("/:comment_id", deleteComment);

module.exports = router;
