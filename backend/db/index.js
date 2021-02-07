const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/earworm");

// just changing these to fit my db name

module.exports = db;
