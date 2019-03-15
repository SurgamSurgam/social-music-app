const db = require("../index.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(users => {
      res.status(200).json({
        status: "success",
        message: "Got all users",
        body: users
      });
    })
    .catch(error => {
      next(error);
    });
};

const getSingleUser = (req, res, next) => {
  db.one("SELECT * FROM users WHERE id=$1", [+req.params.user_id])
    .then(user => {
      res.status(200).json({
        status: "success",
        message: "Got single user",
        body: user
      });
    })
    .catch(error => {
      next(error);
    });
};

const addUser = (req, res, next) => {
  db.none("INSERT INTO users(username) VALUES (${username})", {
    username: req.body.username
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User successfully added!"
      });
    })
    .catch(error => {
      next(error);
    });
};

const deleteUser = (req, res, next) => {
  console.log(+req.params.user_id);
  db.none("DELETE FROM users WHERE id=$1", [+req.params.id])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Deleted user"
      });
    })
    .catch(error => {
      next(error);
    });
};

module.exports = { getAllUsers, getSingleUser, addUser, deleteUser };
