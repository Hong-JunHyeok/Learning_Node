var express = require("express");
const { User } = require("../models");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  User.findAll()
    .then((users) => {
      res.render("sequelize", { users });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
