const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  addUser,
  deleteUser
} = require("../db/queries/usersQueries.js");

/* GET users listing. */
router.get("/", getAllUsers);
router.get("/:user_id", getSingleUser);
router.post("/", addUser);
router.delete("/:user_id", deleteUser);

module.exports = router;
