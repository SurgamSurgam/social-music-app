const db = require("../index.js");

const getAllGenres = (req, res, next) => {
  db.any("SELECT * FROM genres")
    .then(genres => {
      res.status(200).json({
        status: "success",
        message: "Got all genres",
        body: genres
      });
    })
    .catch(error => {
      next(error);
    });
};

const addGenre = (req, res, next) => {
  db.none("INSERT INTO genres(genre_name) VALUES (${genre_name})", {
    genre_name: req.body.genre_name
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Genre successfully added!"
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = { getAllGenres, addGenre };
