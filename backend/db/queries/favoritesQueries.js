const db = require("../index.js");

const getAllFavorites = (req, res, next) => {
  db.any("SELECT * FROM favorites")
    .then(favorites => {
      res.status(200).json({
        status: "success",
        message: "Got all favorites.",
        body: favorites
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllFavoritesForOneSong = (req, res, next) => {
  db.any("SELECT * FROM favorites WHERE song_id=$1", [+req.params.song_id])
    .then(favorites => {
      res.status(200).json({
        status: "success",
        message: "Got all favorites for specific song",
        body: favorites
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllFavoritesForOneUser = (req, res, next) => {
  db.any("SELECT * FROM favorites WHERE user_id=$1", [+req.params.user_id])
    .then(favorites => {
      res.status(200).json({
        status: "success",
        message: "Got all favorites posted by a specific user",
        body: favorites
      });
    })
    .catch(error => {
      next(error);
    });
};

const addFavorite = (req, res, next) => {
  db.none("INSERT INTO favorites(user_id, song_id) VALUES ($1, $2)", [
    +req.body.user_id,
    +req.body.song_id
  ])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User successfully favorited a song!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteFavorite = (req, res, next) => {
  db.result("DELETE FROM favorites WHERE id=$1", [+req.params.favorites_id])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "This favorites was successfully deleted!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllFavorites,
  getAllFavoritesForOneSong,
  getAllFavoritesForOneUser,
  addFavorite,
  deleteFavorite
};
