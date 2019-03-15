const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/earworm_report");

const faker = require("faker");
const allGenres = require("./genreDataSet.json");
const allSongs = require("./top100SongsMar15DataSet.json");
const getChart = require("billboard-top-100").getChart;

//
// getChart("hot-100", "2019-03-15", function(err, chart) {
//   if (err) console.log(err);
//
//   console.log(chart.songs); // prints array of top 100 songs for week of August 27, 2016
// });

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

genre = genres.join(",");

//  SONGS

let songs = [];

for (let i = 0; i < allSongs.length; i++) {
  // let title = allSongs[i].title;
  // let img_url = allSongs[i].img_url;
  console.log(i);
  // genres.push(`('${title}')`);
}

genre = genres.join(",");

// FAVORITES
// COMMENTS
