const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {
    title: "내 정보 - SNS",
    user: req.user, //? 추후에 user정보를 넣을 예정.
  });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - SNS",
    user: req.user,
    joinError: req.flash("joinError"), //* 일회성 메세지
  });
});

router.get("/", (req, res) => {
  res.render("main", {
    title: "SNS",
    twits: [],
    user: req.user,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;
