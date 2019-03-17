const db = require("../index.js");

const getAllComments = (req, res, next) => {
  db.any("SELECT * FROM comments")
    .then(comments => {
      res.status(200).json({
        status: "success",
        message: "Got all comments.",
        body: comments
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllCommentsForOneSong = (req, res, next) => {
  db.any("SELECT * FROM comments WHERE song_id=$1", [+req.params.song_id])
    .then(comments => {
      res.status(200).json({
        status: "success",
        message: "Got all comments for specific song",
        body: comments
      });
    })
    .catch(error => {
      next(error);
    });
};

const addComment = (req, res, next) => {
  db.none(
    "INSERT INTO comments(comment_body, user_id, song_id) VALUES ($1, $2, $3)",
    [req.body.comment_body, +req.body.user_id, +req.body.song_id]
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User successfully added a comment to a song!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const editComment = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(",");
  if (req.body.comment_body && req.body.comment_body.toLowerCase() === "null") {
    req.body.comment_body = null;
  }
  if (req.body.user_id === "null") {
    req.body.user_id = null;
  }
  if (req.body.song_id === "null") {
    req.body.song_id = null;
  }

  db.none(
    "UPDATE comments SET " +
      queryString +
      " WHERE id=" +
      +req.params.comment_id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Comment successfully edited!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteComment = (req, res, next) => {
  db.result("DELETE FROM comments WHERE id=$1", [+req.params.comment_id])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "This comment was successfully deleted!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllComments,
  getAllCommentsForOneSong,
  addComment,
  editComment,
  deleteComment
};
