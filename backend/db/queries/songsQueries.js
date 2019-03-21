const db = require("../index.js");

const getAllSongs = (req, res, next) => {
  db.any(
    "SELECT songs.id, title, img_url, songs.user_id, songs.genre_id, CASE WHEN favorites.song_id IS NULL THEN CAST(0 AS INT) ELSE CAST(COUNT(*) AS INT) END AS favorited_count FROM songs FULL OUTER JOIN favorites ON songs.id = favorites.song_id GROUP BY songs.id, title, img_url, songs.user_id, songs.genre_id, favorites.song_id ORDER BY favorited_count DESC"
  )
    .then(songs => {
      res.status(200).json({
        status: "success",
        message: "Got all songs - sorted by popularity.",
        body: songs
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllSongsForOneGenre = (req, res, next) => {
  db.any(
    "SELECT songs.id, title, img_url, songs.user_id, songs.genre_id, CASE WHEN favorites.song_id IS NULL THEN CAST(0 AS INT) ELSE CAST(COUNT(*) AS INT) END AS favorited_count FROM songs FULL OUTER JOIN favorites ON songs.id = favorites.song_id WHERE genre_id=$1 GROUP BY songs.id, title, img_url, songs.user_id, songs.genre_id, favorites.song_id ORDER BY favorited_count DESC",
    [+req.params.genre_id]
  )
    .then(songs => {
      res.status(200).json({
        status: "success",
        message: "Got all songs - sorted by popularity for specific genre",
        body: songs
      });
    })
    .catch(error => {
      next(error);
    });
};

const getAllSongsPostedByOneUser = (req, res, next) => {
  db.any(
    "SELECT songs.id, title, img_url, songs.user_id, songs.genre_id, CASE WHEN favorites.song_id IS NULL THEN CAST(0 AS INT) ELSE CAST(COUNT(*) AS INT) END AS favorited_count FROM songs FULL OUTER JOIN favorites ON songs.id = favorites.song_id WHERE songs.user_id=$1 GROUP BY songs.id, title, img_url, songs.user_id, songs.genre_id, favorites.song_id ORDER BY favorited_count DESC",
    [+req.params.user_id]
  )
    .then(songs => {
      res.status(200).json({
        status: "success",
        message:
          "Got all songs - sorted by popularity, posted by a specific user",
        body: songs
      });
    })
    .catch(error => {
      next(error);
    });
};

const getSingleSong = (req, res, next) => {
  db.one(
    "SELECT songs.id, title, img_url, songs.user_id, songs.genre_id, CASE WHEN favorites.song_id IS NULL THEN CAST(0 AS INT) ELSE CAST(COUNT(*) AS INT) END AS favorited_count FROM songs FULL OUTER JOIN favorites ON songs.id = favorites.song_id WHERE songs.id=$1 GROUP BY songs.id, title, img_url, songs.user_id, songs.genre_id, favorites.song_id ORDER BY favorited_count DESC",
    [+req.params.song_id]
  )
    .then(song => {
      res.status(200).json({
        status: "success",
        message: "Got one song - with favorites count",
        body: song
      });
    })
    .catch(error => {
      next(error);
    });
};

const addSong = (req, res, next) => {
  db.none(
    "INSERT INTO songs(title, img_url, user_id, genre_id) VALUES ($1, $2, $3, $4)",
    [req.body.title, req.body.img_url, +req.body.user_id, +req.body.genre_id]
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Song successfully added!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteSong = (req, res, next) => {
  db.result("DELETE FROM songs WHERE id=$1", [+req.params.song_id])
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "Song deleted!",
        body: result
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  getAllSongs,
  getAllSongsForOneGenre,
  getAllSongsPostedByOneUser,
  getSingleSong,
  addSong,
  deleteSong
};
