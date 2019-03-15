const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/earworm_report");

module.exports = db;
