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
        message: "Got all favorites of a specific user",
        body: favorites
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllFavoritesAllDetailsForOneUser = (req, res, next) => {
  db.any(
    "SELECT songs.id, title, img_url, songs.user_id, users.username, users.id AS users_serial_id, songs.genre_id, CASE WHEN favorites.song_id IS NULL THEN  CAST(0 AS INT) ELSE  CAST(COUNT(*) AS INT) END AS favorited_count, favorites.id AS fav_id FROM favorites FULL OUTER JOIN songs ON favorites.song_id = songs.id FULL OUTER JOIN users ON users.id = favorites.user_id WHERE favorites.user_id=$1 GROUP BY songs.id, title, img_url, songs.user_id, users.id, users.username, songs.genre_id, favorites.song_id, favorites.id",
    [+req.params.user_id]
  )
    .then(favorites => {
      res.status(200).json({
        status: "success",
        message: "Got all favorites DETAILED for a specific user",
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
  deleteFavorite,
  getAllFavoritesAllDetailsForOneUser
};
