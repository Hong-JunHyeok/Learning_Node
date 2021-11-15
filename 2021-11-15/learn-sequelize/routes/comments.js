var express = require("express");
var { User, Comment } = require("../models");

var router = express.Router();

router.get("/:id", function (req, res, next) {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id },
    },
  })
    .then((comments) => {
      console.log(comments);
      res.json(commentss);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.post("/", function (req, res, next) {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.patch("/:id", function (req, res, next) {
  Comment.update(
    {
      comment: req.body.comment,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.delete("/:id", function (req, res, next) {
  Comment.destroy({ where: { id: req.params.id } })
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
