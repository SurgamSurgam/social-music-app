const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/earworm");

const faker = require("faker");
const allGenres = require("./genreDataSet.json");
const allSongs = require("./top100SongsMar15DataSet.json");
const getChart = require("billboard-top-100").getChart;

// // getChart("hot-100", "2019-03-15", function(err, chart) {
// //   if (err) console.log(err);
// //
// //   console.log(chart.songs); // prints array of top 100 songs for week of August 27, 2016
// // });

//  USERS
let users = [];

for (let i = 0; i < 20; i++) {
  let username = faker.internet.userName();

  users.push(`('${username}')`);
}

users = users.join(", ");

//  GENRES
let genres = [];

for (let i = 0; i < allGenres.length; i++) {
  let genre_name = allGenres[i];

  genres.push(`('${genre_name}')`);
}

genres = genres.join(",");

//  SONGS

let songs = [];

for (let i = 0; i < allSongs.length; i++) {
  let title = allSongs[i].title;
  let img_url = allSongs[i].cover;
  let user_id = Math.ceil(Math.random() * 20);
  let genre_id = Math.ceil(Math.random() * 17);

  songs.push(`('${title}', '${img_url}', ${user_id}, ${genre_id})`);
}

songs = songs.join(",");

// FAVORITES

let favorites = [];

for (let i = 0; i < 80; i++) {
  let user_id = Math.ceil(Math.random() * 20);
  let song_id = Math.ceil(Math.random() * 50);

  favorites.push(`(${user_id}, ${song_id})`);
}

favorites = favorites.join(",");

// COMMENTS

let comments = [];

for (let i = 0; i < 40; i++) {
  let comment_body = faker.lorem.words();
  let user_id = Math.ceil(Math.random() * 20);
  let song_id = Math.ceil(Math.random() * 50);

  comments.push(`('${comment_body}',${user_id}, ${song_id})`);
}

comments = comments.join(",");

const seedingData = async () => {
  try {
    await db.none("INSERT INTO users(username) VALUES " + users);
    await db.none("INSERT INTO genres(genre_name) VALUES" + genres);
    await db.none(
      "INSERT INTO songs(title, img_url, user_id, genre_id) VALUES" + songs
    );
    await db.none("INSERT INTO favorites(user_id, song_id) VALUES" + favorites);
    await db.none(
      "INSERT INTO comments(comment_body, user_id, song_id) VALUES" + comments
    );
  } catch (error) {
    console.error("Error from ASYNC/AWAIT:", error);
  }
};

seedingData();
